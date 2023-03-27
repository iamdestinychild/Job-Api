const CustomError = require('./errors')
const BadRequest = require('./badrequest')
const Unauthorized = require('./unauthorized')
const NotFound = require('./not_found')

module.exports = {
    CustomError,
    BadRequest,
    Unauthorized,
    NotFound
}