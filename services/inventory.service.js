export class inventoryService {
    constructor(repository) {
        this.repository = repository
    }

    getInventoryServ = () => this.repository.getProducts()

    createInventoryServ = (products) => this.repository.createProduct(products)

    editInventoryServ = async (id, product) => {
        const productId = await this.repository.getProductById(id)
        if (productId) {
            await this.repository.updateProduct(id, product)
        }
    }

    deleteInventoryServ = (id) => this.repository.deleteProduct(id)
}
