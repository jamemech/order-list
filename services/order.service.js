export class OrderService {
    constructor(cartRepository, orderRepository) {
        this.cartRepository = cartRepository
        this.orderRepository = orderRepository
    }

    getOrderPageServ = (page) => {
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC']]

        return this.orderRepository.getPage(limit, offset, order)
    }

    createOrderServ = async (carts) => {
        const orderCreated = await this.orderRepository.createOrder("root04")
        const cartCreated = carts.map(item => {
            return {
                order_id: orderCreated.dataValues.id,
                ...item
            }
        })

        await this.cartRepository.createCart(cartCreated)
    }


}

