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

exports.getAllUsers = async () => await userModel.getAllUsers();