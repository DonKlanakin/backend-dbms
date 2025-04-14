exports.defaultHandler = (err, req, res, next) => {
    let stackTrace = "[errors-manager].defaultHandler";
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "FALIED";
    res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
        statusCode: err.statusCode,
        stackTrace: `${stackTrace} >> ${err.stackTrace}`
    });
    next();
};