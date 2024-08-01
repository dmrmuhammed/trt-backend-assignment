// import 'dotenv/config'
import mongoose from 'mongoose'

const db_uri: string = process.env.DB_URI || 'mongodb://localhost:27017/trt-backend'

console.log('DB_URI:', db_uri)

export default () => {
 mongoose.Promise = Promise
 mongoose.connect(db_uri)
 mongoose.connection.on('connected', () => {
  console.log('Connected to the database')
 })
 mongoose.connection.on('error', (err: Error) => {
  console.log('Database error: ' + err)
 })
}
