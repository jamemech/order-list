export class inventoryController {
    constructor(router, service) {
        this.service = service

        router.get('/inventory', this.renderInventoryCtrl)
        router.post('/inventory/create', this.createInventoryCtrl)
        router.put('/inventory/update', this.updateInventoryCtrl)
        router.delete('/inventory/delete', this.deleteInventoryCtrl)
    }

    renderInventoryCtrl = async (req, res) => {
        try {
            const inventory = await this.service.getInventoryServ()
            res.render('index', { inventory })
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    createInventoryCtrl = async (req, res) => {
        try {
            const product = req.body
            await this.service.createInventoryServ(product)
            res.status(201).send('Create Inventory')
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    updateInventoryCtrl = async (req, res) => {
        try {
            const { id, ...product } = req.body
            await this.service.updateInventoryServ(id, product)
            res.status(200).send('Update Inventory')
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    deleteInventoryCtrl = async (req, res) => {
        try {
            const { id } = req.body
            await this.service.deleteInventoryServ(id)
            res.status(204).send('Delete Inventory')
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}
