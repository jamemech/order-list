import fs from 'fs'
import path from 'path'

export class InventoryService {
    constructor(repository) {
        this.repository = repository
    }

    getPageServ = (page) => {
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['id', 'DESC']]
        return this.repository.getPage(limit, offset, order)
    }

    createProductServ = (product) => this.repository.createProduct(product)

    updateProductServ = (id, product) => this.repository.updateProduct(id, product)

    updateStatusServ = async (id, status) => this.repository.updateStatus(id, status)

    deleteImageFile = async (id) => {
        const imagePath = await this.repository.getImage(id)

        if (imagePath && fs.existsSync(path.resolve(imagePath))) {
            fs.unlinkSync(path.resolve(imagePath))
        }
    }

    updateImageServ = async (id, image) => {
        await this.deleteImageFile(id)
        await this.repository.updateImage(id, image)
    }

    deleteProductServ = async (id) => {
        await this.deleteImageFile(id)
        await this.repository.deleteProduct(id)
    }
}
