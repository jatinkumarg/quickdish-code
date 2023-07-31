const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserEngagementSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    recipeId: {
        type: String,
        ref: 'Recipe',
        required: true,
    },
    like: {
        type: Boolean,
        default: false,
    },
    dislike: {
        type: Boolean,
        default: false,
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5,
    },
    comment: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserEngagement = mongoose.model("UserEngagement", UserEngagementSchema);
module.exports = UserEngagement;