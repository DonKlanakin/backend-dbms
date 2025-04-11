const userRepository = require("../repository/user-repository");

exports.createUsers = async (users) => await userRepository.createUsers(users);
exports.getAllUsers = async () => await userRepository.getAllUsers();