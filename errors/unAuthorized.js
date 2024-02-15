const CustomAPIError = require('./custom-api-error');
const { StatusCodes } = require('http-status-codes');

//access forbidden error
class unAuthorizedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.FORBIDDEN;
    }
}
module.exports = unAuthorizedError;