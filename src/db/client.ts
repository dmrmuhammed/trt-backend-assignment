// import 'dotenv/config'
import mongoose from 'mongoose'

const db_uri: string = process.env.DB_URI || 'mongodb://localhost:27017/trt-backend'

export default async () => {
 try {
  await mongoose.connect(db_uri)
  console.log('Connected to the database')
 } catch (error) {
  throw new Error('Error connecting to the database')
  throw error
 }
}
