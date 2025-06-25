//clear

export class CartService {
    constructor(repository) {
        this.repository = repository
    }

    getCartPageServ = async (queryPage, queryTransaction) => {
        const page = parseInt(queryPage) || 1
        const limit = 10
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC'], ['product_id', 'ASC']]
        let where = {}

        if (queryTransaction) {
            where.transaction = queryTransaction
        }
        const { rows, count } = await this.repository.getPage(limit, offset, order, where)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        let transaction = null
        let label = null

        if (queryTransaction) {
            transaction = queryTransaction
            label = `ORDER ${rows[0]?.order_id} - ${transaction.slice(0, 4)}`
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
