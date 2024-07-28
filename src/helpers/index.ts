import crypto from 'crypto'

const SECRET = process.env.SECRET || 'secret'

export const generateSalt = () => crypto.randomBytes(64).toString('base64')
export const generateHash = (str: string, salt: string) => {
 return crypto.createHmac('sha256', [str, salt].join('/')).update(SECRET).digest('hex')
}
