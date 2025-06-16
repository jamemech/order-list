export class LoginController {
    constructor(service, router) {
        this.service = service

        router.get('/login', this.getLoginPageCtrl)
        router.post('/login', this.handleLoginCtrl)
    }

    getLoginPageCtrl = async (req, res) => {
        try {
            const { token } = await this.service.getCartPageServ(req.query)
            res.render('inventory', { token })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    handleLoginCtrl = async (req, res) => {
        try {
            const token = await this.service.handleLoginServ(req.body)
            res.status(201).json(token)

        } catch (error) {
            console.error(error)

            if (error.name === 'UnauthorizedError') {
                res.status(401).json({ error: 'Login failed' })
            } else {
                res.status(500).json({ error: 'Internal Server Error' })
            }
        }
    }
}
