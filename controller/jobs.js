const jobSchema = require('../model/job')
const { StatusCodes } = require('http-status-codes')
const { BadRequest, NotFound } = require('../errors/index')


const getAllJob = async (req, res) => {
    const {userId} = req.user
    const job = await jobSchema.find({createdBy: userId})
    res.status(StatusCodes.OK).json({job, count:job.length})
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id } } = req

    const job = await jobSchema.findOne({ _id: id, createdBy: userId })
    
    if (!job) {
        throw new NotFound(`No job with id ${id}`)
    }
    
    res.status(StatusCodes.OK).json(job)
}

const createJob = async (req, res) => {
    const { userId } = req.user
    req.body.createdBy = userId
    const job = await jobSchema.create(req.body)
    res.status(StatusCodes.CREATED).json(job)
}

const updateJob = async (req, res) => {
    const { user: { userId }, body: { company, position }, params: { id } } = req

    
    if (company === '' || position === '') {
        throw new BadRequest('company or position can not be empty')
    }
    
    const job = await jobSchema.findByIdAndUpdate({ _id: id, createdBy: userId }, req.body, { new: true, runValidators: true })
    
    if (!job) {
        throw new NotFound(`No job with id ${id}`)
    }

    res.status(StatusCodes.OK).json(job)
    

}

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id } } = req
    
    const job = await jobSchema.findByIdAndRemove({ _id: id, createdBy: userId })
    
    if (!job) {
        throw new NotFound(`No job with id ${id}`)
    }

    res.status(StatusCodes.OK).json(job)
}

module.exports = {getAllJob, getJob, createJob, updateJob, deleteJob}