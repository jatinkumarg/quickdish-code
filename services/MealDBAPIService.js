const axios = require('axios');

class MealDBAPIService {
    // initialize meal db api url
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    // get random meal from api
    async getRandomMeal() {
        try {
            const res = await axios.get(`${this.baseURL}/random.php`);
            return res.data;
        } catch (error) {
            console.error(`Error:`, error);
            throw error;
        }
    }

    // get meal by id from api
    async getMealById(id) {
        try {
            const res = await axios.get(`${this.baseURL}/lookup.php?i=${id}`);
            return res.data;
        } catch (error) {
            console.error(`Error:`, error);
            throw error;
        }
    }

    // get meal by name from api
    async getMealByName(name) {
        try {
            const res = await axios.get(`${this.baseURL}/search.php?s=${name}`);
            return res.data;
        } catch (error) {
            console.error(`Error:`, error);
            throw error;
        }
    }

    // get meal by first letter from api
    async getMealByMainIngredient(name) {
        try {
            const res = await axios.get(`${this.baseURL}/filter.php?i=${name}`);
            return res.data;
        } catch (error) {
            console.error(`Error:`, error);
            throw error;
        }
    }

    // get meal by category from api
    async getMealByCategory(name) {
        try {
            const res = await axios.get(`${this.baseURL}/filter.php?c=${name}`);
            return res.data;
        } catch (error) {
            console.error(`Error:`, error);
            throw error;
        }
    }

    // get meal by area from api
    async getMealByArea(name) {
        try {
            const res = await axios.get(`${this.baseURL}/filter.php?a=${name}`);
            return res.data;
        } catch (error) {
            console.error(`Error:`, error);
            throw error;
        }
    }
}

module.exports = MealDBAPIService;
