const userModel = require("../models/user-model");

exports.getAllUsers = async () => {
    const users = await JSON.parse(userModel.getAllUsers());
    return users;
}