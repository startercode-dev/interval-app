const AppError = require('../utils/appError');

const handleDuplicateFieldDB = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    return new AppError(`${value} is taken`, 400);
};

const sendErrorDev = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            msg: err.message,
            stack: err.stack,
        });
    } else {
        // render error web page
        res.status(err.statusCode).render('error', {
            title: 'something went wrong',
            msg: err.message,
        });
    }
};

const sendErrorProd = (err, req, res) => {
    if (req.originalUrl.startsWith('/api')) {
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                msg: err.message,
            });
        }
        res.status(500).json({
            status: 'error',
            msg: 'Error not from our end, unknown error',
        });
    }

    // render error web page
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'something went wrong',
            msg: err.message,
        });
    }
    res.status(err.statusCode).render('error', {
        title: 'something went wrong',
        msg: 'unknown error, please try again',
    });
};

module.exports = (err, req, res, next) => {
    // console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = Object.assign(err);
        if (error.code === 11000) error = handleDuplicateFieldDB(error);

        sendErrorProd(error, req, res);
    }
};
