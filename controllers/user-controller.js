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
    if (!user || typeof user !== 'object') {
        return res.status(400).json({ message: "Expected a user object." });
    }

    try {
        const updatedUser = await userService.updateUserById(user.id, user);
        let userId = updatedUser.rows[0].id;
        res.status(200).json([
            {
                message: `[User ID:${userId}]'s has been updated.`,
                updated: updatedUser.rows[0]
            }
        ]);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    };
};