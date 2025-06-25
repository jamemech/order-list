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

        if (query.transaction) {
            where.transaction = query.transaction
        }
        const { rows, count } = await this.repository.getPage(limit, offset, order, where)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        const transaction = query.transaction || null
        let label = null

        if (transaction) {
            label = `ORDER ${rows[0]?.order_id} - ${transaction.slice(0, 4)}`
        } else {
            label = 'ALL ORDERS'
        }

        return {
            data: rows,
            totalPages,
            page,
            transaction,
            label
        }
    }
}
