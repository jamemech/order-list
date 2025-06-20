import { verifyToken } from '../middlewares/auth.middleware.js'

export class OrderController {
    constructor(service, router) {
        this.service = service

        router.get('/order', this.getOrderPageCtrl)
        router.post('/order/create', this.createOrderCtrl)
        router.patch('/order/status', this.updateOrderStatusCtrl)
    }

    getOrderPageCtrl = async (req, res) => {
        try {
            const { data, totalPages, page } = await this.service.getOrderPageServ(req.query)

            res.render('order', {
                data,
                totalPages,
                page
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    createOrderCtrl = async (req, res) => {
        try {
            const { transaction } = await this.service.createOrderServ(req.body)
            res.status(201).json({ transaction, message: 'Create order' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    updateOrderStatusCtrl = async (req, res) => {
        try {
            await this.service.updateOrderStatusServ(req.body)
            res.status(200).json({ message: 'Update order status' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
