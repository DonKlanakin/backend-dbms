const userRepository = require("../repository/user-repository");

exports.createUsers = async (users) => await userRepository.createUsers(users);
exports.getAllUsers = async () => await userRepository.getAllUsers();
exports.getUserById = async (req, res) => await userRepository.getUserById(req, res);
exports.updateUserById = async (id, user) => await userRepository.updateUserById(id, user);