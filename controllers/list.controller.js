export class listController {
    constructor(router, service) {
        this.service = service

        router.get('/list', (req, res) => this.renderList(req, res))
        router.post('/list/create', (req, res) => this.createList(req, res))
        router.put('/list/update', (req, res) => this.updateList(req, res))
        router.delete('/list/delete', (req, res) => this.deleteList(req, res))
    }

    renderList = async (req, res) => {
        try {
            const products = await this.service.getListProducts()
            res.render('index', { products })
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    createList = async (req, res) => {
        try {
            const product = req.body
            console.log(product)
            await this.service.createListProduct(product)
            res.status(201).send('Create List')
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    updateList = async (req, res) => {
        try {
            const { id, ...product } = req.body
            console.log(product)
            await this.service.updateListProduct(id, product)
            res.status(200).send('Update List')
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }

    deleteList = async (req, res) => {
        try {
            const { id } = req.body
            await this.service.deleteListProduct(id)
            res.status(204).send('Delete List')
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}
