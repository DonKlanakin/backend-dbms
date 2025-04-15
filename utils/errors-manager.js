exports.processErrorMapping = (req, res, next, statusCode, remark) => {
    switch (statusCode || 500) {
        case 400:
            this.handleBadRequest(req, res, next, remark);
            break;
        case 404:
            this.handlePathNotFound(req, res, next, remark);
            break;
        default:
            this.handleInternalServerError(req, res, next, remark);
            break;
    }
};

exports.handleBadRequest = (req, res, next, remark) => {
    const err = new Error();
    const defaultMessage = "Bad Request";
    err.remark = remark || "";
    err.message = defaultMessage;
    err.status = "FAILED";
    err.statusCode = 400;
    next(err);
};

exports.handlePathNotFound = (req, res, next, remark) => {
    const err = new Error();
    const defaultMessage = `'${req.originalUrl}' with method [${req.method}] not found.`;
    err.remark = remark || "";
    err.message = defaultMessage;
    err.status = "NOT FOUND";
    err.statusCode = 404;
    next(err);
};

exports.handleInternalServerError = (req, res, next, remark) => {
    const err = new Error();
    const defaultMessage = "Internal Server Error";
    err.remark = remark || "";
    err.message = defaultMessage;
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
        remark: err.remark
    });
    next();
};