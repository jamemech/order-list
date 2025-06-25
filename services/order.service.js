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

    createOrderServ = async ({ cartList, totalCost }) => {
        const transaction = `T${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Date.now()}`

        const order = {
            transaction,
            total_cost: totalCost
        }

        const { id } = await this.orderRepository.createOrder(order)

        const carts = cartList.map(item => ({
            order_id: id,
            transaction,
            ...item
        }))

        await this.cartRepository.createCarts(carts)

        return { transaction }
    }

    updateOrderStatusServ = async ({ id, status }) => this.orderRepository.updateStatus(id, status)
}

