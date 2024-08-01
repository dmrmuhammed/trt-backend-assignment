import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const SECRET = process.env.SECRET || 'secret'

export const generateHash = (password: string) => {
 return crypto.createHmac('sha256', password).update(SECRET).digest('hex')
}

export const generateAccessToken = (data: { id: string; email: string }) => jwt.sign(data, SECRET, { expiresIn: '3h' })
export const verifyAccessToken = (token: string) => jwt.verify(token, SECRET) as { id: string; email: string }

// export const generateRefreshToken = (data: { id: string; email: string }) => jwt.sign(data, SECRET, { expiresIn: '3d' })
// export const verifyRefreshToken = (token: string) => jwt.verify(token, SECRET) as { id: string; email: string }
