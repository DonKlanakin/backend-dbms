exports.processErrorMapping = (req, res, next, statusCode, remarks) => {
    switch (statusCode || 500) {
        case 400:
            this.handleBadRequest(req, res, next, remarks);
            break;
        case 404:
            this.handleNotFound(req, res, next, remarks);
            break;
        default:
            this.handleInternalServerError(req, res, next, remarks);
            break;
    }
};

exports.handleBadRequest = (req, res, next, remarks) => {
    const err = new Error();
    const defaultMessage = "Bad Request";
    err.remarks = remarks || "";
    err.message = defaultMessage;
    err.status = "FAILED";
    err.statusCode = 400;
    next(err);
};

exports.handleNotFound = (req, res, next, remarks) => {
    const err = new Error();
    const defaultMessage = "Data Not Found";
    err.remarks = remarks || "";
    err.message = defaultMessage;
    err.status = "NOT FOUND";
    err.statusCode = 404;
    next(err);
};

exports.handleInternalServerError = (req, res, next, remarks) => {
    const err = new Error();
    const defaultMessage = "Internal Server Error";
    err.remarks = remarks || "";
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
        remarks: err.remarks
    });
    next();
};