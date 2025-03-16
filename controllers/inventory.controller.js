export class inventoryController {
    constructor(router, service) {
        this.service = service

        router.get('/inventory', this.renderInventoryCtrl)
        router.post('/inventory/create', this.createInventoryCtrl)
        router.put('/inventory/edit', this.editInventoryCtrl)
        router.delete('/inventory/delete', this.deleteInventoryCtrl)
    }

    renderInventoryCtrl = async (req, res) => {
        try {
            const inventory = await this.service.getInventoryServ()
            res.render("inventory", { inventory })
        } catch (error) {
            console.error("Error:", error)
            res.status(500).send("Internal Server Error")
        }
    }

    createInventoryCtrl = async (req, res) => {
        try {
            const products = req.body
            await this.service.createInventoryServ(products)
            res.status(201).send("Create Inventory")
        } catch (error) {
            console.error("Error:", error)
            res.status(500).send("Internal Server Error")
        }
    }

    editInventoryCtrl = async (req, res) => {
        try {
            const { id, ...product } = req.body
            await this.service.editInventoryServ(id, product)
            res.status(200).send("Update Inventory")
        } catch (error) {
            console.error("Error:", error)
            res.status(500).send("Internal Server Error")
        }
    }

    deleteInventoryCtrl = async (req, res) => {
        try {
            const { id } = req.body
            await this.service.deleteInventoryServ(id)
            res.status(204).send("Delete Inventory")
        } catch (error) {
            console.error("Error:", error)
            res.status(500).send("Internal Server Error")
        }
    }
}
