//clear

export class ProductRepository {
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
