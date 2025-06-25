import fs from 'fs'
import path from 'path'

export class InventoryService {
    constructor(repository) {
        this.repository = repository
    }

    getInventoryPageServ = async (query) => {
        const page = parseInt(query.page) || 1
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['id', 'DESC']]

        const { rows, count } = await this.repository.getPage(limit, offset, order)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        return {
            data: rows,
            totalPages,
            page
        }
    }

    createInventoryServ = (product) => this.repository.createProduct(product)

    updateInventoryServ = async ({ id, ...product }) => this.repository.updateProduct(id, product)

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
