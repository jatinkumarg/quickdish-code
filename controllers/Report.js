
const RecipeSearch = require('../services/RecipeSearch');
const RecipeNameSearch = require('../services/RecipeNameSearch');
const RecipeAreaSearch = require('../services/RecipeAreaSearch');
const RecipeCategorySearch = require('../services/RecipeCategorySearch');
const RecipeIngredientSearch = require('../services/RecipeIngredientSearch');
const { getMostLikedRecipes, getMostDislikedRecipes, getMostRatedRecipes } = require('../methods/UserEngagement');
const { getMostViewedRecipes } = require('../methods/Recipe');
const { createReport } = require('../methods/Report');

const reportView = async (req, res) => {
    const dbLogger = req.app.locals.dbLogger;
    try {
        const user = await req?.user;
        res.render("report", { user: user });
    } catch (error) {
        console.error('Error:', error);
        dbLogger.log(`Error: report view event.`);
        return null;
    }
};

const getReport = async (req, res) => {
    const dbLogger = req.app.locals.dbLogger;
    try {
        const type = req?.query?.type;
        let response = null;

        // check redis cache for report query
        const dataCache = req.app.locals.dataCache;
        const cacheKey = `report_${type}`;
        const cacheData = await dataCache.get(cacheKey);
        if (cacheData) {
            console.log('Cache hit')
            return res.json(cacheData);
        }

        // get most liked recipes
        if (type === "like") {
            response = await getMostLikedRecipes();
        }

        // get most disliked recipes
        if (type === "dislike") {
            response = await getMostDislikedRecipes();
        }

        // get most viewed recipes
        if (type === "viewCount") {
            response = await getMostViewedRecipes();
        }

        // get most rated recipes
        if (type === "ratings") {
            response = await getMostRatedRecipes();
        }

        if (response?.length > 0) {
            // set redis cache
            await dataCache.set(cacheKey, response, 3600);

            // save report type in database
            await createReport(type);

            return res.json(response);
        }

        return res.json([]);
    } catch (error) {
        console.error('Error:', error);
        dbLogger.log(`Error: get report event.`);
        return null;
    }
};

const searchReport = async (req, res) => {
    try {
        const filter = req?.query?.filter;
        const query = req?.query?.q;
        const data = req?.body;
        let response = null;

        if (filter === "name") {
            const recipeSearch = new RecipeNameSearch(data);
            response = recipeSearch.search(data, query);
        } else if (filter === "area") {
            const recipeSearch = new RecipeAreaSearch(data);
            response = recipeSearch.search(data, query);
        } else if (filter === "category") {
            const recipeSearch = new RecipeCategorySearch(data);
            response = recipeSearch.search(data, query);
        } else if (filter === "mainIngredient") {
            const recipeSearch = new RecipeIngredientSearch(data);
            response = recipeSearch.search(data, query);
        } else {
            const recipeSearch = new RecipeSearch(data);
            response = recipeSearch.search(data, query);
        }

        if (response?.length > 0) {
            return res.json(response);
        }
        return res.json([]);
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

module.exports = {
    reportView, getReport, searchReport
};