export class listController {
    constructor(router, service) {
        this.service = service

        router.get('/list', this.renderListCtrl)
    }

    renderListCtrl = async (req, res) => {
        try {
            const list = await this.service.getListServ()
            res.render('index', { list })
        } catch (error) {
            console.error('Error:', error)
            res.status(500).send('Internal Server Error')
        }
    }
}