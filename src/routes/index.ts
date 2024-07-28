import { Router } from 'express'
import auth from './auth'

const router = Router()

export default (): Router => {
 auth(router)
 // 404
 router.use((req, res) => {
  res.status(404).send('Route not found')
 })
 return router
}
