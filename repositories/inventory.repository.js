export class InventoryRepository {
    constructor(Product) {
        this.Product = Product
    }

    getPage = async (limit, offset, order) => {
        const pageData = await this.Product.findAndCountAll({
            limit,
            offset,
            order
        })

        const totalPages = Math.max(1, Math.ceil(pageData.count / limit))

        return {
            totalPages,
            data: pageData.rows
        }
    }

    getImage = async (id) => {
        const product = await this.Product.findByPk(id)
        return product.image
    }

    createProduct = (product) => this.Product.create(product)

    updateProduct = (id, product) => this.Product.update(
        product,
        { where: { id } })

    updateStatus = (id, status) => this.Product.update(
        { status },
        { where: { id } }
    )

    updateImage = (id, image) => this.Product.update({ image }, {
        where: { id }
    })

    deleteProduct = (id) => this.Product.destroy({
        where: { id }
    })
}
