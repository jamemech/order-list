import jwt from 'jsonwebtoken'
import config from '../configs/authen.config.js'

export class LoginService {
    loginServ = async ({ username, password }) => {
        const isValid =
            username === config.username && password === config.password

        if (!isValid) {
            const error = new Error()
            error.name = 'UnauthorizedError'
            throw error
        }

        const payload = { username }
        const options = { expiresIn: '1h' }
        return jwt.sign(payload, config.jwtSecret, options)
    }
}
