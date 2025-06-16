export class OrderService {
    constructor(orderRepository, cartRepository) {
        this.orderRepository = orderRepository
        this.cartRepository = cartRepository
    }

    getOrderPageServ = async (query) => {
        const page = parseInt(query.page) || 1
        const limit = 10
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC']]

        const { rows, count } = await this.orderRepository.getPage(limit, offset, order)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        return {
            data: rows,
            totalPages,
            page
        }
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

        return order
    }


    updateOrderStatusServ = async ({ id, status }) => this.orderRepository.updateStatus(id, status)
}

