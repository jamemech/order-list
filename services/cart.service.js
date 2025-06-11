//clear

export class CartService {
    constructor(repository) {
        this.repository = repository
    }

    getCartPageServ = async (query) => {
        const page = parseInt(query.page) || 1
        const orderId = query.order_id

        const limit = 10
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC'], ['id', 'ASC']]
        const where = {}

        if (orderId) {
            where.order_id = orderId
        }

        const { rows, count } = await this.repository.getPage(limit, offset, order, where)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        return {
            data: rows,
            totalPages,
            page
        }
    }


}
