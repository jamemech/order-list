import express, { Router } from 'express'
import multer from 'multer'
import path from 'path'
import 'dotenv/config'
import config from './configs/db.config.js'
import { Connection } from './connections/sequelize.connection.js'
import { Product } from './models/product.js'

// Inventory module
import { InventoryRepository } from './repositories/inventory.repository.js'
import { InventoryService } from './services/inventory.service.js'
import { InventoryController } from './controllers/inventory.controller.js'



const env = process.env.NODE_ENV || 'development'
const db = new Connection(config, env)
const productDb = new Product(db)

const app = express()
const router = Router()
const port = 3000

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads'),
        filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
    })
})

app.set("view engine", "ejs")
app.set('views', './views')

app.use(express.json())
app.use('/uploads', express.static('uploads'))

db.authenticate()
    .then(() => {
        console.log('Database connected')
    })
    .catch((error) => {
        console.error('Database connect error:', error)
        setImmediate(() => process.exit(1))
    })

// Inventory module
const inventoryRepo = new InventoryRepository(productDb)
const inventorySvc = new InventoryService(inventoryRepo)
new InventoryController(inventorySvc, router, upload)



app.use(router)

const server = app.listen(port, () => {
    console.log(`Server listening on port: ${port}`)
})

process.on('SIGINT', async () => {
    console.log('Shutting down...')

    try {
        await db.close()
        console.log('Database closed')
    } catch (error) {
        console.error('Database close error:', error)
    }

    server.close(() => {
        console.log('Server Closed')
        setImmediate(() => process.exit(0))
    })
})