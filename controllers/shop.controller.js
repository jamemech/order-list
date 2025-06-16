export class ShopController {
    constructor(service, router) {
        this.service = service

        router.get('/shop', this.getShopPageCtrl)
    }

    getShopPageCtrl = async (req, res) => {
        try {
            const { data, totalPages, page } = await this.service.getShopPageServ(req.query)

            res.render('shop', {
                data,
                totalPages,
                page
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
