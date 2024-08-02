import 'dotenv/config'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './routes'
import mongoClient from './db/client'

// Create a new express application instance
var app: express.Application = express()

// Call middlewares
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connect to the database
mongoClient()

// Routes
app.use(router)

// The port the express app will listen on
const port = process.env.PORT || 3000

// Start the express server
app.listen(port, () => {
 console.log(`Server started at http://localhost:${port}`)
})

export default app
