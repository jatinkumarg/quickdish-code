const mongoose = require("mongoose");

const SearchKeywordSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
    },
    filter: {
        type: String,
    },
    count: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const SearchKeyword = mongoose.model("SearchKeyword", SearchKeywordSchema);
module.exports = SearchKeyword;