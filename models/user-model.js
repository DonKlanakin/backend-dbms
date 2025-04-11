const userRepository = require("../repository/user-repository");

exports.createUsers = async (users) => userRepository.createUsers(users);
// exports.getAllUsers = async (req, res) => userRepository.getAllUsers();
// exports.getUserById = async (req, res) => userRepository.getUserById();
// exports.updateUserById = async (req, res) => userRepository.updateUserById();