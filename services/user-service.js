const userRepository = require("../repository/user-repository");

exports.getAllUsers = async () => {
    const users = await userRepository.getAllUsers();
    // Process data

    return users;
}