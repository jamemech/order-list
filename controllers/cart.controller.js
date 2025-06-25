export class CartController {
    constructor(service, router) {
        this.service = service

        router.get('/cart', this.getCartPageCtrl)
    }

    getCartPageCtrl = async (req, res) => {
        try {
            const { data, totalPages, page, transaction, label } = await this.service.getCartPageServ(req.query)

            res.render('cart', {
                data,
                totalPages,
                page,
                transaction,
                label
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
