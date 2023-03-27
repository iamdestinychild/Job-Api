const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided']
    },
    email: {
        type: String,
        required: [true, 'email must be provided'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password must be provided'],
        minlenght: 8
    }

})

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userName: this.name, userId: this._id}, process.env.JWT_SECRET, {expiresIn:process.env.JWT_LIFE})
}

UserSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password)
}

module.exports = mongoose.model('User', UserSchema)