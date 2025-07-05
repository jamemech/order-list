import jwt from 'jsonwebtoken'
import config from '../configs/authen.config.js'

const decodeToken = (token) => {
    return jwt.verify(token, config.jwtSecret)
}

export const alreadyLogin = (req, res, next) => {
    const token = req.cookies['token']
    if (!token) return next()

    try {
        decodeToken(token)
        return res.redirect('/order')
    } catch (err) {
        console.error('Token verification failed:', err.message)
        return next()
    }
}

export const authPage = (req, res, next) => {
    const token = req.cookies['token']
    if (!token) return res.redirect('/')

    try {
        req.user = decodeToken(token)
        next()
    } catch (err) {
        console.error('Token verification failed', err.message)
        return res.redirect('/')
    }
}

export const authAPI = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }
    try {
        req.user = decodeToken(token)
        next()
    } catch (err) {
        console.error('Token verification failed', err.message)
        return res.status(401).json({ message: 'Invalid token' })
    }
}
