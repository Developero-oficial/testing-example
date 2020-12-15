import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

const secret = process.env.REACT_APP_SECRET || 'secret'

export const encodeJwt = payload => jwt.sign(payload, secret)

export const verifyJwt = token => jwt.verify(token, secret)

export const decodeJwt = token => jwt_decode(token)
