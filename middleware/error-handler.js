const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

//custom error handling middleware

const errorHandler = (err, req, res, next) => {
    let customError = {
            statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
            msg: err.message || 'something went wrong try again'
        }
        //handling duplicate values error
    if (err.code && err.code === 11000) {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = `Duplicate value for field ${Object.keys(err.keyValue)} please choose another value`
    }
    //cast error==>for wrong id
    if (err.name === 'CastError') {
        customError.statusCode = StatusCodes.BAD_REQUEST,
            customError.msg = `No job with id :${err.value}`
    }
    //validation errors
    if (err.name === 'ValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST,
            customError.msg = `missing value for field(s) ${Object.keys(err.errors).join(',')} `
    }
    return res.status(customError.statusCode).json({ msg: customError.msg, err })
};
module.exports = errorHandler;
