import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import rouuter from './routes'
import mongoClient from './db/client'

// Create a new express application instance
const app: express.Application = express()

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
 mongoClient()
})
