export class inventoryService {
    constructor(repository) {
        this.repository = repository
    }

    async getAllProduct() {
        const result = await this.repository.findAll()
        return result
    }
}