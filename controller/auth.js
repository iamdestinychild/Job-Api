const User = require('../model/user')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const {BadRequest, Unauthorized} = require('../errors/index')


const register = async (req, res) => {

    const user = await User.create({ ...req.body })

    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            token
        }
    })
    
}

const login = async (req, res) => {
    const { email, password } = req.body
    
    if (!email || !password) {
        throw new BadRequest('Please Provide Email And Password')
    }

    const user = await User.findOne({email})

    if (!user) {
        throw new Unauthorized('Invalid Cridentials')
    }

    const isPassword = await user.comparePassword(password)

    if (!isPassword) {
        throw new Unauthorized('Invalid Cridentials')
    }

    token = user.createJWT()

    res.status(StatusCodes.OK).json({username:user.name, token})
}

module.exports = {register, login}