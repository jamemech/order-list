export class LoginController {
    constructor(service, router) {
        this.service = service

        router.get('/login', this.getLoginPageCtrl)
        router.post('/authen', this.loginCtrl)
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
            res.status(200).json({ token })

        } catch (error) {
            console.error(error)

            if (error.name === 'UnauthorizedError') {
                res.status(401).json({ error: 'Invalid username or password' })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }
}
