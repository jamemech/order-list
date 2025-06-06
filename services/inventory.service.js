//clear

import fs from 'fs'
import path from 'path'

export class InventoryService {
    constructor(repository) {
        this.repository = repository
    }

    getInventoryPageServ = async (page) => {
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['id', 'DESC']]

        const { rows, count } = await this.repository.getPage(limit, offset, order)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        return {
            data: rows,
            totalPages
        }
    }

    createInventoryServ = (productData) => this.repository.createProduct(productData)

    updateInventoryServ = async ({ id, ...productData }) => this.repository.updateProduct(id, productData)

    updateInventoryStatusServ = async ({ id, status }) => this.repository.updateStatus(id, status)

    updateInventoryImageServ = async (id, image) => {
        await this._deleteImage(id)
        await this.repository.updateImage(id, image)
    }

    deleteInventoryServ = async (id) => {
        await this._deleteImage(id)
        await this.repository.deleteProduct(id)
    }

    _deleteImage = async (id) => {
        const imagePath = await this.repository.getImage(id)

        if (imagePath && fs.existsSync(path.resolve(imagePath))) {
            fs.unlinkSync(path.resolve(imagePath))
        }
    }
}
