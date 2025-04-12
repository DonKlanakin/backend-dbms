const userModel = require("../models/user-model");

exports.createUsers = async (users) => {
    // Validate fields
    for (let user of users) {
      if (!user.name || !user.email || !user.age) {
        throw new Error("Missing required user fields");
      }
    }
  
    await userModel.createUsers(users);
};

exports.getAllUsers = async (filters) => await userModel.getAllUsers(filters);
exports.getUserById = async (req, res) => userModel.getUserById(req, res);

exports.updateUserById = async (id, user) => {
    // Validate fields
    const { name, email, age } = user;
    if (!name || !email || !age) {
        throw new Error("Missing required user fields");
    }

    const result = await userModel.updateUserById(id, user);
    return result;
};

exports.deleteUserById = async (req, res) => userModel.deleteUserById(req, res);