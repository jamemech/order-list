import jwt from 'jsonwebtoken'
import config from '../configs/authen.config.js'

export const verifyTokenRenderPage = (req, res, next) => {
    const token = req.cookies['token']

    if (!token) {
        return res.redirect('/login')
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch (err) {
        console.error('Token verification failed:', err.message)
        return res.redirect('/login')
    }
}

export const verifyTokenAPI = (req, res, next) => {
    const authHeader = req.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, config.jwtSecret)
        req.user = decoded
        next()
    } catch (err) {
        console.error('Token verification failed:', err.message)
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export const isAlreadyLogin = (req, res, next) => {
    const token = req.cookies['token']

    if (token) {
        try {
            const decoded = jwt.verify(token, config.jwtSecret)
            req.user = decoded
            return res.redirect('/order')
        } catch (err) {
            console.error('Token verification failed:', err.message)
            next()
        }
    } else {
        next()
    }
}