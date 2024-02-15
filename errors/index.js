//import all custom errors here
const CustomAPIError = require('./custom-api-error');
const BadRequest = require('./bad-request');
const unAuthenticatedError=require('./unAuthenticated');
const notFound=require('./notFound')
const unAuthorizedError=require('./unAuthorized')

module.exports = {
    CustomAPIError,
    BadRequest,
    unAuthenticatedError,
    notFound,
    unAuthorizedError

}