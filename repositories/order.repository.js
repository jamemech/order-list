export class OrderRepository {
    constructor(Order) {
        this.Order = Order
    }

    getPage = (limit, offset, order) => this.Order.findAndCountAll({
        limit,
        offset,
        order
    })

    createOrder = (order) => this.Order.create(order)

    updateStatus = (id, status) => this.Order.update(
        { status },
        { where: { id } }
    )
}
