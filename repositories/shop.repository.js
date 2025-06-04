//clear

export class ShopRepository {
    constructor(Product) {
        this.Product = Product
    }

    getPage = async (limit, offset, order, where) => {
        return await this.Product.findAndCountAll({
            limit,
            offset,
            order,
            where
        })
    }
}
