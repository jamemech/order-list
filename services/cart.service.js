//clear

export class CartService {
    constructor(repository) {
        this.repository = repository
    }

    getCartPageServ = async (query) => {
        const page = parseInt(query.page) || 1
        const limit = 10
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC'], ['product_id', 'ASC']]
        let where = {}

        if (query.order_id) {
            where.order_id = query.order_id
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
