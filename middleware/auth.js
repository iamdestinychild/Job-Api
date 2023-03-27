const jwt = require('jsonwebtoken')
const {Unauthorized} = require('../errors/index')


const auth = async (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log(req.header.authorization)
        throw new Unauthorized('No Token')
    }

    const token = authHeader.split(' ')[1]


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId }
        next()
    }
    catch (err) {
        throw new Unauthorized('Authorization Invalid')
    }
}

module.exports = auth