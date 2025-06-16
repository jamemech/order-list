export class ShopRepository {
    constructor(Product) {
        this.Product = Product
    }

    getPage = (limit, offset, order, where) => this.Product.findAndCountAll({
        limit,
        offset,
        order,
        where
    })
}
