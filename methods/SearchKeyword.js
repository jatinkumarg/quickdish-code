const SearchKeyword = require("../models/SearchKeyword");

async function getSearchKeywords(keyword, filter) {
    const searchKeyword = await SearchKeyword.findOne({
        keyword: keyword,
        filter: filter,
    });
    return searchKeyword;
}

async function addSearchKeyword(keyword, filter) {
    // check if search keyword already exists
    const findSearchKeyword = await getSearchKeywords(keyword, filter);
    if (findSearchKeyword) {
        findSearchKeyword.count++;
        findSearchKeyword.save();
        return findSearchKeyword;
    }

    // create new search keyword
    const searchKeyword = await SearchKeyword.create({
        keyword: keyword,
        filter: filter,
    });
    return searchKeyword;
}

module.exports = {
    getSearchKeywords, addSearchKeyword
}