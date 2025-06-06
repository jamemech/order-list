//clear

export class OrderRepository {
    constructor(Order) {
        this.Order = Order
    }

    getPage = async (limit, offset, order) => {
        return await this.Order.findAndCountAll({
            limit,
            offset,
            order
        })
    }

    createOrder = (orderData) => this.Order.create(orderData)
}
