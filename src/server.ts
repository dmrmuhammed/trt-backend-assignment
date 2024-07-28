import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import rouuter from './routes'

// Create a new express application instance
const app: express.Application = express()
const db_uri: string = process.env.DB_URI || 'mongodb://localhost:27017/trt-backend'

// Call middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Define the routes
app.use('/', rouuter())

// The port the express app will listen on
const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
 console.log(`Server started on http://localhost:${port}`)
})

// Connect to the database
mongoose.Promise = Promise
mongoose.connect(db_uri)
mongoose.connection.on('connected', () => {
 console.log('Connected to the database')
})
mongoose.connection.on('error', (err: Error) => {
 console.log('Database error: ' + err)
})
