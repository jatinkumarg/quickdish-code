const RecipeSort = require('../services/RecipeSort');
const RecipeNameSort = require('../services/RecipeNameSort');
const RecipeCategorySort = require('../services/RecipeCategorySort');
const RecipeAreaSort = require('../services/RecipeAreaSort');
const RecipeIngredientSort = require('../services/RecipeIngredientSort');
const SearchValidator = require('../services/SearchValidator');
const { createRecipe } = require("../methods/Recipe");
const { getUserEngagement } = require("../methods/UserEngagement");
const { addSearchKeyword } = require('../methods/SearchKeyword');

const recipeView = async (req, res) => {
    const apiLogger = req.app.locals.apiLogger;
    try {
        const user = await req?.user;
        const userEngagement = await getUserEngagement(user?._id, req?.params?.id);

        // get random recipe from api
        const mealDBAPIService = req.app.locals.mealDBAPIService;
        const response = await mealDBAPIService.getRandomMeal();
        const newRecipe = await createRecipe(response.meals[0]);

        res.render("recipe", {
            recipe: newRecipe, userEngagement: userEngagement, user: user
        });
    } catch (error) {
        console.error('Error:', error);
        apiLogger.log(`Error: recipe random event.`);
        return null;
    }
};

const recipeSearch = async (req, res) => {
    const apiLogger = req.app.locals.apiLogger;
    try {
        const user = await req?.user;
        const keywordsObserver = req.app.locals.keywordsObserver;

        // show recent search keywords by user
        const searchKeywords = keywordsObserver?.getSearchKeywordList();
        res.render("search", { user: user, searchKeywords: searchKeywords });
    } catch (error) {
        console.error('Error:', error);
        apiLogger.log(`Error: recipe search event.`);
        return null;
    }
};

const recipeInfoView = async (req, res) => {
    const apiLogger = req.app.locals.apiLogger;
    try {
        const user = await req?.user;
        const userEngagement = await getUserEngagement(user?._id, req?.params?.id);

        // get a recipe info by id from api
        const mealDBAPIService = req.app.locals.mealDBAPIService;
        const response = await mealDBAPIService.getMealById(req?.params?.id);
        const meal = response?.meals[0];

        // log recipe lookup event
        apiLogger.log(`#${meal?.idMeal}: ${meal?.strMeal} recipe lookup event.`);

        const newRecipe = await createRecipe(meal);
        res.render("recipe", {
            recipe: newRecipe, userEngagement: userEngagement, user: user
        });
    } catch (error) {
        console.error('Error:', error);
        apiLogger.log(`Error: recipe lookup event.`);
        return null;
    }
};

const getRecipes = async (req, res) => {
    const apiLogger = req.app.locals.apiLogger;
    try {
        const mealDBAPIService = req.app.locals.mealDBAPIService;
        const query = req?.query?.q;
        const filter = req?.query?.filter;

        // validate query
        const searchValidator = new SearchValidator();
        const isValid = searchValidator.validate(query);
        if (!isValid) {
            console.log('Invalid search query');
            return res.json([]);
        }

        // notify observers
        const searchObserver = req.app.locals.searchObserver;
        const keywordsObserver = req.app.locals.keywordsObserver;
        if (!keywordsObserver.getSearchKeywordList().includes(query)) {
            searchObserver.addSearchKeyword(query);
            console.log('Search keyword list:', keywordsObserver.getSearchKeywordList());
        }

        // add search keyword to database
        const addSearchKeywordResult = await addSearchKeyword(query, filter);
        console.log('Add search keyword result:', addSearchKeywordResult);

        // check redis cache for search query
        const dataCache = req.app.locals.dataCache;
        const cacheKey = `${filter}_${query}`;
        const cacheData = await dataCache.get(cacheKey);
        if (cacheData) {
            console.log('Cache hit')
            return res.json(cacheData);
        }

        // check filter
        let response = null;
        if (filter == 'mainIngredient') {
            response = await mealDBAPIService.getMealByMainIngredient(query);
        } else if (filter == 'category') {
            response = await mealDBAPIService.getMealByCategory(query);
        } else if (filter == 'area') {
            response = await mealDBAPIService.getMealByArea(query);
        } else {
            response = await mealDBAPIService.getMealByName(query);
        }

        if (response?.meals?.length > 0) {
            // set redis cache
            await dataCache.set(cacheKey, response.meals, 3600);
            return res.json(response.meals);
        }
        return res.json([]);
    } catch (error) {
        console.error('Error:', error);
        apiLogger.log(`Error: get recipes event.`);
        return null;
    }
};

const sortRecipes = async (req, res) => {
    try {
        const sortBy = req?.query?.sortBy;
        const order = req?.query?.order;
        const data = req?.body;

        let recipeSort = null;
        if (sortBy == "strMeal") {
            recipeSort = new RecipeNameSort(data);
        } else if (sortBy == "strCategory") {
            recipeSort = new RecipeCategorySort(data);
        } else if (sortBy == "strArea") {
            recipeSort = new RecipeAreaSort(data);
        } else if (sortBy == "strIngredient1") {
            recipeSort = new RecipeIngredientSort(data);
        } else {
            recipeSort = new RecipeSort(data);
        }
        const sortedRecipes = recipeSort.sort(data, sortBy, order);

        if (sortedRecipes?.length > 0) {
            return res.json(sortedRecipes);
        }

        return res.json([]);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

module.exports = {
    recipeView, recipeSearch, recipeInfoView, getRecipes, sortRecipes
};