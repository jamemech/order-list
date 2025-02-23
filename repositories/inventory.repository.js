export class inventoryRepository {
    constructor(Product) {
        this.Product = Product
    }

    async findAll() {
        const result = await this.Product.findAll()
        return result
    }
}
