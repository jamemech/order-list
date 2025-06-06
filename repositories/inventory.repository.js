//clear

export class InventoryRepository {
    constructor(Product) {
        this.Product = Product
    }

    getPage = async (limit, offset, order) => {
        return await this.Product.findAndCountAll({
            limit,
            offset,
            order
        })
    }

    getImage = async (id) => {
        const product = await this.Product.findByPk(id)
        return product.image
    }

    createProduct = (productData) => this.Product.create(productData)

    updateProduct = (id, productData) => this.Product.update(productData, {
        where: { id }
    })

    updateStatus = (id, status) => this.Product.update({ status }, {
        where: { id }
    })

    updateImage = (id, image) => this.Product.update({ image }, {
        where: { id }
    })

    deleteProduct = (id) => this.Product.destroy({
        where: { id }
    })
}
