export class CartRepository {
    constructor(Cart) {
        this.Cart = Cart
    }

    getPage = async (limit, offset, order) => {
        return await this.Cart.findAndCountAll({
            limit,
            offset,
            order
        })
    }
}
