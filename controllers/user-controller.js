const userService = require("../services/user-service");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        if (users.length < 0) {
            res.status(204);
        } else {
            res.status(200).json(users);
        }
    } catch (error) {
        res.status(500).json({ status: "Failed", message: "An error occurred during data retrieval."});
    }
}