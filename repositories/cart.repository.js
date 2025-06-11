//clear

export class CartRepository {
    constructor(Cart) {
        this.Cart = Cart
    }

    getPage = async (limit, offset, order, where) => {
        return await this.Cart.findAndCountAll({
            limit,
            offset,
            order,
            where
        })
    }

    createCarts = (cartsData) => this.Cart.bulkCreate(cartsData)
}
