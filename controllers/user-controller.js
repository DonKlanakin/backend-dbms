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
        res.status(500).json({ error: err.toString() });
    };
};

exports.getAllUsers = async (req, res) => {
    try {
        const filters = req.query;
        console.log(filters);
        const users = await userService.getAllUsers(filters);
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            res.status(400).json({
                message: "No users found with the given filters." 
            });
        };
    } catch (err) {
        res.status(500).json({
            stackTrace: "user-controller :: getAllUsers",
            error: err.toString()
        });
    }
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
            error: err.toString()
        });
    };
};

exports.deleteUserById = async (req, res) => {
    try {
        const result = await userService.deleteUserById(req, res);
        if (result.rows.length > 0) {
            res.status(200).json([{
                status: "SUCCESS",
                message: `[User ID:${req.params.id}] has been deleted.`
            }]);
        } else {
            res.status(400).json({ error: "User ID not found."});
        };
    } catch (err) {
        res.status(500).json({
            stackTrace: "user-controller :: deleteUserById",
            error: err.toString()
        });
    }
};