export class listService {
    constructor(repository) {
        this.repository = repository
    }

    getListProducts = () => this.repository.getProducts()

    createListProduct = (products) => this.repository.createProduct(products)

    updateListProduct = async (id, product) => {
        const productId = await this.repository.getProductById(id)
        if (productId) {
            await this.repository.updateProduct(id, product)
        }
    }

    deleteListProduct = (id) => this.repository.deleteProduct(id)
}
