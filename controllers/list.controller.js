export class listController {
    constructor(router, service) {
        this.service = service

        router.get('/list', this.renderList)
        router.post('/list/create', this.createList)
        router.put('/list/update', this.updateList)
        router.delete('/list/delete', this.deleteList)
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
