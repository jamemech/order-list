//clear

export class OrderService {
    constructor(orderRepository, cartRepository) {
        this.orderRepository = orderRepository
        this.cartRepository = cartRepository
    }

    getOrderPageServ = (page) => {
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC']]

        return this.orderRepository.getPage(limit, offset, order)
    }

    createOrderServ = async ({ cartItems, totalCost }) => {
        const orderData = {
            username: "root04",
            total_cost: totalCost
        }

        const order = await this.orderRepository.createOrder(orderData)

        const cartsData = cartItems.map(item => ({
            order_id: order.dataValues.id,
            ...item
        }))

        await this.cartRepository.createCarts(cartsData)
    }
}

