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

        const pageData = await this.repository.getPage(limit, offset, order)
        const totalPages = Math.max(1, Math.ceil(pageData.count / limit))

        return {
            totalPages,
            data: pageData.rows
        }
    }

    createInventoryServ = (product) => this.repository.createProduct(product)

    updateInventoryServ = (id, product) => this.repository.updateProduct(id, product)

    updateInventoryStatusServ = async (id, status) => this.repository.updateStatus(id, status)

    deleteImage = async (id) => {
        const imagePath = await this.repository.getImage(id)

        if (imagePath && fs.existsSync(path.resolve(imagePath))) {
            fs.unlinkSync(path.resolve(imagePath))
        }
    }

    updateInventoryImageServ = async (id, image) => {
        await this.deleteImage(id)
        await this.repository.updateImage(id, image)
    }

    deleteInventoryServ = async (id) => {
        await this.deleteImage(id)
        await this.repository.deleteProduct(id)
    }
}
