const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

//custom error handling middleware

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    // console.error(err.stack)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'oops! something broke' })
};
module.exports = errorHandler;
