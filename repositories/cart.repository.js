export class CartRepository {
    constructor(Cart) {
        this.Cart = Cart
    }

    getPage = (limit, offset, order, where) => this.Cart.findAndCountAll({
        limit,
        offset,
        order,
        where
    })

    createCarts = (carts) => this.Cart.bulkCreate(carts)
}
