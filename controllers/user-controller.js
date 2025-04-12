const userService = require("../services/user-service");

exports.createUsers = async (req, res) => {
    const users = req.body;
    if (!Array.isArray(users)) {
        return res.status(400).json({ message: "Expected an array of users." });
    };

    try {
        await userService.createUsers(users);
        res.status(201).json({ message: `${users.length} users added.` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    };
};

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();
    if (users.length > 0) {
        res.status(200).json(users);
    } else {
        res.status(500).json(users);
    };
};

exports.getUseById = async (req, res) => {
    const user = await userService.getUserById(req, res);
    if (user.rows.length > 0) {
        res.status(200).json(user.rows[0]);
    } else {
        res.status(400).json({ error: "User not found."});
    };
};

exports.updateUserById = async (req, res) => {
    const user = req.body;
    const userId = req.params.id;
    try {
        if (!user || typeof user !== 'object') {
            return res.status(400).json({
                message: "Expected a user object."
            });
        } else if (user.id != userId) {
            return res.status(400).json({
                message: "Params and Body ids mismatached."
            });
        };
        const updatedUser = await userService.updateUserById(userId, user);
        res.status(200).json([{
            status: "SUCCESS",
            message: `[User ID:${userId}]'s has been updated.`,
            updated: updatedUser.rows[0]
        }]);
    } catch (err) {
        res.status(500).json({
            stackTrace: "user-controller :: updateUserById",
            error: err.message
        });
    };
};