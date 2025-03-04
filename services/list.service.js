export class listService {
    constructor(repository) {
        this.repository = repository
    }

    getListServ = () => this.repository.getProducts()
}
