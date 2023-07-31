const { createOrUpdateUserEngagement } = require('../methods/UserEngagement');

const addOrUpdateUserEngagement = async (req, res) => {
    const dbLogger = req.app.locals.dbLogger;
    try {
        const userId = req?.body?.userId;
        const recipeId = req?.body?.recipeId;
        const like = req?.body?.like;
        const dislike = req?.body?.dislike;
        const comment = req?.body?.comment;
        const ratings = req?.body?.ratings;

        const userEngagementData = {
            userId,
            recipeId,
            like,
            dislike,
            comment,
            ratings
        };

        // create or update user engagement event
        const result = await createOrUpdateUserEngagement(userEngagementData);
        if (result?._id) {
            return res.json(result);
        }
        return res.json({});
    } catch (error) {
        console.error('Error:', error);
        dbLogger.log(`Error: add or update user engagement event.`);
        return null;
    }
};

module.exports = {
    addOrUpdateUserEngagement
};