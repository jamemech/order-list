export class ShopService {
    constructor(repository) {
        this.repository = repository
    }

    getShopPageServ = async (query) => {
        const page = parseInt(query.page) || 1
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['type', 'ASC']]
        const where = { status: 'Active' }

        const { rows, count } = await this.repository.getPage(limit, offset, order, where)
        const totalPages = Math.max(1, Math.ceil(count / limit))

        return {
            data: rows,
            totalPages,
            page
        }
    }
}
