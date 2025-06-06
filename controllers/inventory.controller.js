//clear

import { inventoryValidation } from '../dtos/inventory.js'
import { handleValidationErrors } from '../utils/validation.js'

export class InventoryController {
    constructor(service, router, upload) {
        this.service = service
        this.upload = upload

        router.get('/inventory', this.getInventoryPageCtrl)
        router.post('/inventory/create', inventoryValidation(), handleValidationErrors, this.createInventoryCtrl)
        router.put('/inventory/edit', inventoryValidation(), handleValidationErrors, this.updateInventoryCtrl)
        router.patch('/inventory/status', this.updateInventoryStatusCtrl)
        router.patch('/inventory/upload', this.upload.single('image'), this.updateInventoryImageCtrl)
        router.delete('/inventory/delete', this.deleteInventoryCtrl)
    }

    getInventoryPageCtrl = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1
            const { data, totalPages } = await this.service.getInventoryPageServ(page)

            res.render('inventory', {
                data,
                totalPages,
                page
            })

        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }

    createInventoryCtrl = async (req, res) => {
        try {
            await this.service.createInventoryServ(req.body)
            res.status(201).send('Create inventory')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    updateInventoryCtrl = async (req, res) => {
        try {
            await this.service.updateInventoryServ(req.body)
            res.status(200).send('Update inventory')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    updateInventoryStatusCtrl = async (req, res) => {
        try {
            await this.service.updateInventoryStatusServ(req.body)
            res.status(200).send('Update inventory status')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    updateInventoryImageCtrl = async (req, res) => {
        try {
            await this.service.updateInventoryImageServ(req.body.id, req.file.path)
            res.status(200).send('Update inventory image')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    deleteInventoryCtrl = async (req, res) => {
        try {
            await this.service.deleteInventoryServ(req.body.id)
            res.status(204).send()

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}
