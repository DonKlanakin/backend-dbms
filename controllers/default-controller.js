const errorManager = require("../utils/errors-manager");

exports.displayPathNotFound = (req, res, next) => {
    let remarks = {
        error: `${req.originalUrl} with method [${req.method}] not found.`,
    }
    errorManager.processErrorMapping(req, res, next, 404, remarks);
};