const userModel = require("../models/user-model");
const validateUserFields = require("../utils/user-validator");

exports.createUsers = async (users) => {
  const validatedUsers = [];
  for (const user of users) {
    const validated = await validateUserFields(user, {
      checkEmailUnique: true,
    });
    validatedUsers.push(validated);
  }
  await userModel.createUsers(validatedUsers);
};

exports.getAllUsers = async (filters) => await userModel.getAllUsers(filters);
exports.getUserById = async (req, res) => userModel.getUserById(req, res);

exports.updateUserById = async (id, user) => {
  const validated = await validateUserFields(user, {
    checkEmailUnique: true,
    excludeId: id,
  });
  const result = await userModel.updateUserById(id, validated);
  return result;
};

exports.deleteUserById = async (req, res) => userModel.deleteUserById(req, res);
