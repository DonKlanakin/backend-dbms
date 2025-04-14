exports.displayPathNotFound = (req, res, next) => {
    const err = new Error();
    err.message = `'${req.originalUrl}' with method [${req.method}] not found.`;
    err.status = "NOT FOUND";
    err.statusCode = 404;
    err.stackTrace = "[default-controller].displayPathNotFound";
    next(err);
};