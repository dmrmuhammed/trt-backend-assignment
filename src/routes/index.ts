import { Router } from 'express'
import auth from './auth'
import tasks from './tasks'
import { verifyAccessToken } from '../helpers'

export default (): Router => {
 const app = Router()
 auth(app)

 // JWT Middleware
 app.use((req, res, next) => {
  const token = req.cookies['trt-backend-auth']
  if (!token) return res.status(401).send('Unauthorized')
  try {
   const user = verifyAccessToken(token)
   req.body.userId = user.id
   next()
  } catch (error) {
   return res.status(401).send('Unauthorized')
  }
 })

 tasks(app)
 return app
}
