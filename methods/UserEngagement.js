const UserEngagement = require("../models/UserEngagement");

async function getFoodRecipeLikes(id) {
    const userEngagements = await UserEngagement.find({ recipeId: id, like: true });
    return userEngagements;
}

async function getFoodRecipeDislikes(id) {
    const userEngagements = await UserEngagement.find({ recipeId: id, dislike: true });
    return userEngagements;
}

async function getFoodRecipeComments(id) {
    const userEngagements = await UserEngagement.find({
        recipeId: id,
        comment: {
            $exists: true,
            $ne: null
        }
    });
    return userEngagements;
}

async function getFoodRecipeRatings(id) {
    const userEngagements = await UserEngagement.find({
        recipeId: id,
        ratings: {
            $exists: true,
            $ne: null
        }
    });
    return userEngagements;
}

async function addUserEngagement(userEngagementData) {
    const newUserEngagement = new UserEngagement({
        userId: userEngagementData.userId,
        recipeId: userEngagementData.recipeId,
        like: userEngagementData.like,
        dislike: userEngagementData.dislike,
        comment: userEngagementData.comment,
        ratings: userEngagementData.ratings
    });
    await newUserEngagement.save();
    return newUserEngagement;
}

async function updateUserEngagement(userId, recipeId, userEngagementData) {
    const updatedUserEngagement = await UserEngagement.updateOne({ userId, recipeId }, userEngagementData);
    return updatedUserEngagement;
}

async function getUserEngagement(userId, recipeId) {
    const userEngagement = await UserEngagement.findOne({ userId, recipeId });
    return userEngagement;
}

async function createOrUpdateUserEngagement(userEngagementData) {
    try {
        // check if user engagement already then update
        const userEngagement = await getUserEngagement(userEngagementData.userId, userEngagementData.recipeId);
        if (userEngagement?._id) {
            const updatedUserEngagement = await updateUserEngagement(userEngagementData.userId, userEngagementData.recipeId, userEngagementData);
            console.log('updatedUserEngagement:', updatedUserEngagement, 'userEngagementData:', userEngagementData);
            if (updatedUserEngagement?.acknowledged) {
                return userEngagementData;
            }
            return {};
        }

        // else create new user engagement
        const newUserEngagement = await addUserEngagement(userEngagementData);
        return newUserEngagement;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

async function getMostLikedRecipes() {
    // query to sort recipes by number of likes by most liked
    const result = await UserEngagement.aggregate([
        {
            $match: { like: true },
        },
        {
            $group: {
                _id: '$recipeId',
                totalLikes: { $sum: 1 },
            },
        },
        {
            $sort: { totalLikes: -1 },
        },
        {
            $lookup: {
                from: 'recipes',
                localField: '_id',
                foreignField: 'id',
                as: 'recipeData',
            },
        }
    ])
    return result;
}

async function getMostDislikedRecipes() {
    // query to sort recipes by number of disliked by most disliked
    const result = await UserEngagement.aggregate([
        {
            $match: { dislike: true },
        },
        {
            $group: {
                _id: '$recipeId',
                totalDislikes: { $sum: 1 },
            },
        },
        {
            $sort: { totalDislikes: -1 },
        },
        {
            $lookup: {
                from: 'recipes',
                localField: '_id',
                foreignField: 'id',
                as: 'recipeData',
            },
        }
    ])
    return result;
}

async function getMostRatedRecipes() {
    // query to sort recipes by number of ratings by most rated
    const result = await UserEngagement.aggregate([
        {
            $match: { ratings: { $exists: true, $ne: null } },
        },
        {
            $group: {
                _id: '$recipeId',
                totalRatings: { $sum: 1 },
            },
        },
        {
            $sort: { totalRatings: -1 },
        },
        {
            $lookup: {
                from: 'recipes',
                localField: '_id',
                foreignField: 'id',
                as: 'recipeData',
            },
        }
    ])
    return result;
}

module.exports = {
    getFoodRecipeLikes, getFoodRecipeDislikes, getFoodRecipeComments, getFoodRecipeRatings, addUserEngagement, updateUserEngagement, getUserEngagement, createOrUpdateUserEngagement,
    getMostLikedRecipes, getMostDislikedRecipes, getMostRatedRecipes
}