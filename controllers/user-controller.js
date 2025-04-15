const userService = require("../services/user-service");
const errorManager = require("../utils/errors-manager");

exports.createUsers = async (req, res, next) => {
    const users = req.body;
    if (!Array.isArray(users)) {
        let remarks = {
            error: "Expected an array of users.",
            change: "No changes were made."
        }
        errorManager.processErrorMapping(req, res, next, 400, remarks);
        return;
    };

    try {
        await userService.createUsers(users);
        res.status(201).json({
            message: `${users.length} users added.`,
            inserted: users.map(u => u.email)
        });
    } catch (err) {
        let statusCode = Number(err.message.substring(0,3)) || 500;
        let remarks = {
            error: "An error occurred in [user-controller].createUsers.",
            change: "No changes were made."
        }
        errorManager.processErrorMapping(req, res, next, statusCode, remarks);
    };
};

exports.getAllUsers = async (req, res, next) => {
    let { ...filters } = req.query;
    filters.page = parseInt(filters.page) || 1;
    filters.limit = parseInt(filters.limit) || 10;

    try {
        const users = await userService.getAllUsers(filters);
        if (users.length > 0) {
            res.status(200).json(users);
        } else {
            let remarks = {
                error: "No users found with the given filters."
            }
            errorManager.processErrorMapping(req, res, next, 404, remarks);
            return;
        };
    } catch (err) {
        console.debug(err.message);
        let remarks = {
            error: "An error occurred in [user-controller].getAllUsers."
        }
        errorManager.processErrorMapping(req, res, next, 500, remarks);
    };
};

exports.getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req, res);
        if (user.rows.length > 0) {
            res.status(200).json(user.rows[0]);
        } else {
            let remarks = {
                error: "No users found with the given filters."
            }
            errorManager.processErrorMapping(req, res, next, 404, remarks);
            return;
        };
        
    } catch (err) {
        console.debug(err.message);
        let remarks = {
            error: "An error occurred in [user-controller].getUserById."
        }
        errorManager.processErrorMapping(req, res, next, 500, remarks);
    };
};

exports.updateUserById = async (req, res, next) => {
    const user = req.body;
    const userId = req.params.id;
    try {
        if (!user || typeof user !== 'object') {
            let remarks = {
                error: "Expected a user object.",
                change: "No changes were made."
            }
            errorManager.processErrorMapping(req, res, next, 400, remarks);
            return;
        } else if (user.id != userId) {
            let remarks = {
                error: "Params and Body ids mismatached.",
                change: "No changes were made."
            }
            errorManager.processErrorMapping(req, res, next, 400, remarks);
            return;
        };
        const updatedUser = await userService.updateUserById(userId, user);
        res.status(200).json([{
            status: "SUCCESS",
            message: `[User ID:${userId}] has been updated.`,
            updated: updatedUser.rows[0]
        }]);

    } catch (err) {
        console.debug(err.message);
        let remarks = {
            error: "An error occurred in [user-controller].updateUserById.",
            change: "No changes were made."
        }
        errorManager.processErrorMapping(req, res, next, 500, remarks);
    };
};

exports.deleteUserById = async (req, res, next) => {
    try {
        const result = await userService.deleteUserById(req, res);
        if (result.rows.length > 0) {
            res.status(200).json([{
                status: "SUCCESS",
                message: `[User ID:${req.params.id}] has been deleted.`
            }]);
        } else {
            let remarks = {
                error: "User ID not found.",
                change: "Nothing was deleted."
            }
            errorManager.processErrorMapping(req, res, next, 404, remarks);
            return;
        };
        
    } catch (err) {
        console.debug(err.message);
        let remarks = {
            error: "An error occurred in [user-controller].deleteUserById.",
            change: "Nothing was deleted."
        }
        errorManager.processErrorMapping(req, res, next, 500, remarks);
    };
};