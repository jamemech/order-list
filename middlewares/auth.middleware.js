import jwt from 'jsonwebtoken'
import config from '../configs/authen.config.js'

const decodeToken = (token) => {
    return jwt.verify(token, config.jwtSecret)
}

export const isAlreadyLogin = (req, res, next) => {
    const token = req.cookies['token']
    if (token) {
        try {
            decodeToken(token)
            return res.redirect('/order')
        } catch (err) {
            console.error('Token verification failed')
            next()
        }
    } else {
        next()
    }
}

export const verifyTokenRenderPage = (req, res, next) => {
    const token = req.cookies['token']
    if (!token) return res.redirect('/')

    try {
        const decoded = decodeToken(token)
        req.user = decoded
        next()
    } catch (err) {
        console.error('Token verification failed')
        return res.redirect('/')
    }
}

export const verifyTokenAPI = (req, res, next) => {
    const authHeader = req.headers['authorization']
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = decodeToken(token)
        req.user = decoded
        next()
    } catch (err) {
        console.error('Token verification failed')
        return res.status(401).json({ message: 'Invalid token' })
    }
}
