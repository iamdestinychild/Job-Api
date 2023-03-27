const { StatusCodes } = require("http-status-codes");

const handelErrors = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.massage || 'Something went wrong, please try again'
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
        customError.statusCode = 400
    }

    if (err.name === 'CastError') {
        customError.msg = `No item found for id ${err.value}`
        customError.statusCode = 404
    }

    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value enter for ${Object.keys(err.keyValue)} field, please enter a different value`
        customError.statusCode = 400
    }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg:customError.msg})

}

module.exports = handelErrors