import multer from 'multer'
import { inventoryValidation } from '../dtos/inventory.js'
import { handleValidationErrors } from '../utils/validation.js'

export class InventoryController {
    constructor(service, router, storage) {
        this.upload = multer({ storage })
        this.service = service

        router.get('/inventory', this.renderInventoryCtrl)
        router.post('/inventory/create', inventoryValidation(), handleValidationErrors, this.createInventoryCtrl)
        router.put('/inventory/edit', inventoryValidation(), handleValidationErrors, this.editInventoryCtrl)
        router.put('/inventory/status', this.statusInventoryCtrl)
//???
        router.put('/inventory/upload', this.upload.single('image'), this.uploadInventoryCtrl)
        router.delete('/inventory/delete', this.deleteInventoryCtrl)
    }

    renderInventoryCtrl = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1

            const { totalPages, data } = await this.service.getPageServ(page)
            res.render('inventory', {
                data,
                page,
                totalPages
            })

        } catch (error) {
            console.error(error)
            res.status(500).send('Internal Server Error')
        }
    }

    createInventoryCtrl = async (req, res) => {
        try {
            await this.service.createProductServ(req.body)
            res.status(201).send('Create product')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    editInventoryCtrl = async (req, res) => {
        try {
            await this.service.updateProductServ(req.body.id, req.body)
            res.status(200).send('Update product')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    statusInventoryCtrl = async (req, res) => {
        try {
            await this.service.updateStatusServ(req.body.id, req.body.status)
            res.status(204).send('Update status')

        } catch {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    uploadInventoryCtrl = async (req, res) => {
        try {
            await this.service.updateImageServ(req.body.id, req.file.path)
            res.status(200).send('Upload image')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    deleteInventoryCtrl = async (req, res) => {
        try {
            await this.service.deleteProductServ(req.body.id)
            res.status(204).send('Delete product')

        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}
