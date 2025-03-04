export class inventoryService {
    constructor(repository) {
        this.repository = repository
    }

    getInventoryServ = () => this.repository.getProducts()

    createInventoryServ = (product) => this.repository.createProduct(product)

    updateInventoryServ = async (id, product) => {
        const productId = await this.repository.getProductById(id)
        if (productId) {
            return this.repository.updateProduct(id, product)
        }
    }

    deleteInventoryServ = (id) => this.repository.deleteProduct(id)
}
