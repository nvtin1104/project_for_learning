const jwt = require('jsonwebtoken')
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
export const createToken = ({ username, role, userId }) => {
  return jwt.sign({ username, role, userId }, env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24
  })
}
export const createResfeshToken = ({ username, role }) => {
  return jwt.sign({ username, role }, env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })
}
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Unauthorized' })
  jwt.verify(token, env.TOKEN_SECRET, function (err, user) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token expired' });
      } else {
        return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unauthorized' });
      }
    }
    req.user = user
    next()
  })

}
export const verifyAdmin = (req, res, next) => {
  const { role } = req.user
  if (role !== 'admin')
    return res.status(StatusCodes.FORBIDDEN).json({
      message: 'You not admin'
    })
  next()
}