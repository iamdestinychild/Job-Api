const mongoose = require("mongoose")

const jobSchema = mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provied company'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'Please provied position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['Interview', 'delined', 'pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provied user']
    }
}, { timestamps: true })

module.exports = mongoose.model('Job', jobSchema)