const express = require('express')
require('dotenv').config()
require('express-async-errors')

// extra security

const rateLimit = require('express-rate-limit')
const cors = require('cors')
const xss = require('xss-clean')
const helmet = require('helmet')

const notFoundError = require('./middleware/not_found')
const handelErrors = require('./middleware/handelError')
const auth = require('./middleware/auth')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')


const app = express()

app.set('trust proxy', 1)

app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}))
app.use(helmet())
app.use(cors())
app.use(xss())

app.use(express.json())

// db
const connectDB = require('./db/connect')

// routes



app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', auth, jobsRouter)


app.use(handelErrors)
app.use(notFoundError)


const port = process.env.PORT || 4444

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
}

start()