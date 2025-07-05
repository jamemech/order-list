import { alreadyLogin } from '../middlewares/auth.middleware.js'

export class LoginController {
    constructor(service, router) {
        this.service = service

        router.get('/', alreadyLogin, this.getLoginPageCtrl)
        router.post('/login', this.loginCtrl)
    }

    getLoginPageCtrl = async (req, res) => {
        try {
            res.render('login')
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    loginCtrl = async (req, res) => {
        try {
            const token = await this.service.loginServ(req.body)
            res.status(200).json({ token, message: 'Login successful' })
        } catch (error) {
            console.error(error)
            if (error.name === 'UnauthorizedError') {
                res.status(401).json({ error: 'Username or password is incorrect' })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }
}
