exports.processErrorMapping = (req, res, next, statusCode) => {
    switch (statusCode) {
        case 400:
            this.handleBadRequest(req, res, next);
            break;
        case 404:
            this.handlePathNotFound(req, res, next);
            break;
        default:
            this.handleInternalServerError(req, res, next);
            break;
    }
};

exports.handleBadRequest = (req, res, next) => {
    const err = new Error();
    err.internalMessage = "";
    err.message = "Bad Request";
    err.status = "FAILED";
    err.statusCode = 400;
    next(err);
};

exports.handlePathNotFound = (req, res, next) => {
    const err = new Error();
    err.internalMessage = "";
    err.message = `'${req.originalUrl}' with method [${req.method}] not found.`;
    err.status = "NOT FOUND";
    err.statusCode = 404;
    next(err);
};

exports.handleInternalServerError = (req, res, next) => {
    const err = new Error();
    err.internalMessage = "";
    err.message = "Internal Server Error";
    err.status = "FAILED";
    err.statusCode = 500;
    next(err);
};

exports.processErrorGateway = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "FALIED";
    res.status(err.statusCode).json({
        message: err.message,
        status: err.status,
        statusCode: err.statusCode,
    });
    next();
};