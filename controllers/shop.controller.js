//clear

export class ShopController {
    constructor(service, router) {
        this.service = service

        router.get('/shop', this.getShopPageCtrl)
    }

    getShopPageCtrl = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const { data, totalPages } = await this.service.getShopPageServ(page)

            res.render('shop', {
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
