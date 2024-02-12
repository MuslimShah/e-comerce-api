//import all custom errors here
const CustomAPIError = require('./custom-api-error');
const BadRequest = require('./bad-request');
const unAuthenticatedError=require('./unAuthenticated');

module.exports = {
    CustomAPIError,
    BadRequest,
    unAuthenticatedError
}