const userRepository = require("../repository/user-repository");

exports.createUsers = async (users) => await userRepository.createUsers(users);
exports.getAllUsers = async (filters) => await userRepository.getAllUsers(filters);
exports.getUserById = async (req, res) => await userRepository.getUserById(req, res);
exports.updateUserById = async (id, user) => await userRepository.updateUserById(id, user);
exports.deleteUserById = async (req, res) => await userRepository.deleteUserById(req, res);