const userService = require("../services/user-service");

exports.createUsers = async (req, res) => {
    const users = req.body;
    if (!Array.isArray(users)) {
        return res.status(400).json({ message: "Expected an array of users." });
    }

    try {
        await userService.createUsers(users);
        res.status(201).json({ message: `${users.length} users added.` });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    const users = await userService.getAllUsers();

    if (users.length > 0) {
        res.status(200).json(users);
    } else {
        res.status(500).json(users);
    }
};