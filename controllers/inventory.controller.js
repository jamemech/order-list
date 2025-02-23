export class inventoryController {
    constructor(router, service) {
        this.service = service

        router.get('/inventory', this.inventoryPage)
    }

    async inventoryPage(req, res) {
        try {
            const products = await this.service.getAllProduct()
            res.render('index', { products })
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}