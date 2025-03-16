export class listService {
    constructor(repository) {
        this.repository = repository
    }

    getListServ = async () => {
        const products = await this.repository.getProducts()
        return products.filter(product => product.status === 'Active')
    }
}
