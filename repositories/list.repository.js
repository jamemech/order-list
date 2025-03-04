export class listRepository {
    constructor(Product) {
        this.Product = Product
    }

    getProducts = () => this.Product.findAll({
        order: [['id', 'ASC']]
    })
}
