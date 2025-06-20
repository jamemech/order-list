import jwt from 'jsonwebtoken'
import config from '../configs/authen.config.js'

export const verifyToken = (isPage) => {
    if (isPage) {
        return (req, res, next) => {
            const authHeader = req.headers['authorization']

            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.redirect('/login')
            }

            const token = authHeader.split(' ')[1]

            try {
                const decoded = jwt.verify(token, config.jwtSecret)
                req.user = decoded
                next()
            } catch (err) {
                console.error('Token verification failed:', err.message)
                return res.redirect('/login')
            }
        }

    } else {
        return (req, res, next) => {
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
    }
}
