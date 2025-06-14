//clear

export class OrderController {
    constructor(service, router) {
        this.service = service

        router.get('/order', this.getOrderPageCtrl)
        router.post('/order/create', this.createOrderCtrl)
        router.patch('/order/status', this.updateOrderStatusCtrl)

    }

    getOrderPageCtrl = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const { data, totalPages } = await this.service.getOrderPageServ(page)

            res.render('order', {
                data,
                totalPages,
                page
            })

        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }

    createOrderCtrl = async (req, res) => {
        try {
            const order = await this.service.createOrderServ(req.body)
            res.status(201).json({ order_id: order.dataValues.id, message: 'Create order' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    updateOrderStatusCtrl = async (req, res) => {
        try {
            await this.service.updateOrderStatusServ(req.body)
            res.status(200).send('Update order status')

        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }
}
