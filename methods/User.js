const User = require("../models/User");

function getUsers() {
    const user = User.find({});
    return user.users;
}

function createUser(userData) {
    const newUser = User.insert(userData);
    return newUser;
}

module.exports = {
    getUsers, createUser
}