const express = require("express");
const router = express.Router();

const { checkRoute } = require("../auth/route");
const {
    signupView,
    signinView,
    signupUser,
    signinUser,
    logoutUser,
} = require("../controllers/User");
const { mainView } = require("../controllers/Main");
const { recipeView, recipeSearch, recipeInfoView, getRecipes, sortRecipes } = require("../controllers/Recipe");
const { addOrUpdateUserEngagement } = require("../controllers/UserEngagement");
const { reportView, getReport, searchReport } = require("../controllers/Report");
const { aboutView } = require("../controllers/Misc");

// main route
router.get("/", aboutView);

// user auth routes
router.get("/signup", signupView);
router.get("/signin", signinView);
router.post("/signup", signupUser);
router.post("/signin", signinUser);
router.get("/logout", logoutUser);
router.get("/main", checkRoute, mainView);

// recipe routes
router.get("/recipe", recipeView);
router.get("/recipe/:id", recipeInfoView);

// search routes
router.get("/search", recipeSearch);
router.get("/api/search", getRecipes);
router.post("/api/sort", sortRecipes);

// user engagement route
router.post("/api/userEngagement", addOrUpdateUserEngagement);

// report routes
router.get("/report", reportView);
router.get("/api/report", getReport);
router.post("/api/searchReport", searchReport);

// 404 middleware
router.use(async (req, res) => {
    const user = await req?.user;
    return res.render("404", {
        user: user
    });
});


module.exports = router;