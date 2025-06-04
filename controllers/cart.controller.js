export class CartController {
    constructor(service, router) {
        this.service = service

        router.get('/cart', this.getCartPageCtrl)
    }

    getCartPageCtrl = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const { data, totalPages } = await this.service.getCartPageServ(page)

            res.render('cart', {
                data,
                totalPages,
                page
            })

        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }
}
