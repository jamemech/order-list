export class CartService {
    constructor(repository) {
        this.repository = repository
    }

    getCartPageServ = async (page) => {
        const limit = 5
        const offset = limit * (page - 1)
        const order = [['created_at', 'DESC'], ['id', 'ASC']]

        const pageData = await this.repository.getPage(limit, offset, order)
        const totalPages = Math.max(1, Math.ceil(pageData.count / limit))

        return {
            totalPages,
            data: pageData.rows
        }
    }
}
