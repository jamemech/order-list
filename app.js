import express, { Router } from 'express'
import 'dotenv/config'
import dbConfig from './configs/db.config.js'
import { connection } from './connections/postgres.js'

import { Product } from './models/product.js'
import { listRepository } from './repositories/list.repository.js'
import { listService } from './services/list.service.js'
import { listController } from './controllers/list.controller.js'

const app = express()
const router = Router()
const port = 3000

const db = new connection(dbConfig)

app.set("view engine", "ejs")
app.set('views', './')

app.use(express.json())

db.authenticate()
    .then(() => {
        console.log('Database connection successful.')
    })
    .catch((error) => {
        console.error('Database connection error:', error)
        process.exit(1)
    })

const productDb = new Product(db)
const listRepo = new listRepository(productDb)
const listSvc = new listService(listRepo)
new listController(router, listSvc)

app.use(router)






app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})

process.on('SIGINT', async () => {
    console.log('Shutting down...')

    try {
        await db.close()
        console.log('Database connection closed.')
    } catch (error) {
        console.error('Error while closing the database connection:', error)
    }

    app.close(() => {
        console.log('Express server closed.')
        process.exit(0)
    })
})