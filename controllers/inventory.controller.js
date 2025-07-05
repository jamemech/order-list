import { authPage, authAPI } from '../middlewares/auth.middleware.js'
import { inventoryValidator } from '../validators/inventory.validator.js'
import { validation } from '../middlewares/validation.middleware.js'

export class InventoryController {
    constructor(service, router, upload) {
        this.service = service
        this.upload = upload

        router.get('/inventory', authPage, this.getInventoryPageCtrl)
        router.post('/inventory/create', authAPI, inventoryValidator(), validation, this.createInventoryCtrl)
        router.put('/inventory/edit', authAPI, inventoryValidator(), validation, this.updateInventoryCtrl)
        router.patch('/inventory/status', authAPI, this.updateInventoryStatusCtrl)
        router.patch('/inventory/upload', authAPI, this.upload.single('image'), this.updateInventoryImageCtrl)
        router.delete('/inventory/delete', authAPI, this.deleteInventoryCtrl)
    }

    getInventoryPageCtrl = async (req, res) => {
        try {
            const { data, totalPages, page } = await this.service.getInventoryPageServ(req.query)

            res.render('inventory', {
                data,
                totalPages,
                page
            })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    createInventoryCtrl = async (req, res) => {
        try {
            await this.service.createInventoryServ(req.body)
            res.status(201).json({ message: 'Create inventory' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    updateInventoryCtrl = async (req, res) => {
        try {
            await this.service.updateInventoryServ(req.body)
            res.status(200).json({ message: 'Update inventory' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    updateInventoryStatusCtrl = async (req, res) => {
        try {
            await this.service.updateInventoryStatusServ(req.body)
            res.status(200).json({ message: 'Update inventory status' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    updateInventoryImageCtrl = async (req, res) => {
        try {
            await this.service.updateInventoryImageServ(req.body.id, req.file.filename)
            res.status(200).json({ message: 'Update inventory image' })

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }

    deleteInventoryCtrl = async (req, res) => {
        try {
            await this.service.deleteInventoryServ(req.body.id)
            res.status(204).send()

        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    }
}
