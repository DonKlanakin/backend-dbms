const errorManager = require("../utils/errors-manager");

exports.displayPathNotFound = (req, res, next) => {
    errorManager.processErrorMapping(req, res, next, 400);
};