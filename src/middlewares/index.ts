import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken } from '../helpers'

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
 const token = req.cookies['trt-backend-auth']
 if (!token) return res.status(401).send('Unauthorized')
 try {
  const user = verifyAccessToken(token)
  if (!user) return res.status(401).send('Unauthorized')
  req.body.userId = user.id
  next()
 } catch (error) {
  return res.status(401).send('Unauthorized')
 }
}
