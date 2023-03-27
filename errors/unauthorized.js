const CustomError = require('./errors')
const {StatusCodes} = require('http-status-codes')

class Unauthorized extends CustomError{
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = Unauthorized