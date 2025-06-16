import jwt from 'jsonwebtoken'
import config from '../configs/authen.config.js'

export class LoginService {
    handleLoginServ = async ({ username, password }) => {
        const isValid =
            username === config.username && password === config.password

        if (!isValid) {
            const error = new Error('Invalid username or password')
            error.name = 'UnauthorizedError'
            throw error
        }

        const payload = { username }
        const options = { expiresIn: '1h' }
        const token = jwt.sign(payload, config.jwtSecret, options)

        return {
            token,
            type: 'Bearer',
            expiresIn: '1h'
        }
    }
}
