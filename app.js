import express, { Router } from 'express'
import multer from 'multer'
import path from 'path'
import 'dotenv/config'
import config from './configs/db.config.js'
import { Connection } from './connections/sequelize.connection.js'
import { Order } from './models/order.js'
import { Product } from './models/product.js'
import { Cart } from './models/cart.js'

import { OrderRepository } from './repositories/order.repository.js'
import { OrderService } from './services/order.service.js'
import { OrderController } from './controllers/order.controller.js'

import { InventoryRepository } from './repositories/inventory.repository.js'
import { InventoryService } from './services/inventory.service.js'
import { InventoryController } from './controllers/inventory.controller.js'

import { ShopRepository } from './repositories/shop.repository.js'
import { ShopService } from './services/shop.service.js'
import { ShopController } from './controllers/shop.controller.js'

import { CartRepository } from './repositories/cart.repository.js'
import { CartService } from './services/cart.service.js'
import { CartController } from './controllers/cart.controller.js'

const env = process.env.NODE_ENV || 'development'
const db = new Connection(config, env)
const productDb = new Product(db)
const cartDb = new Cart(db)
const orderDb = new Order(db)

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

const inventoryRepo = new InventoryRepository(productDb)
const inventorySvc = new InventoryService(inventoryRepo)
new InventoryController(inventorySvc, router, upload)

const shopRepo = new ShopRepository(productDb)
const shopSvc = new ShopService(shopRepo)
new ShopController(shopSvc, router)

const cartRepo = new CartRepository(cartDb)
const cartSvc = new CartService(cartRepo)
new CartController(cartSvc, router)

const orderRepo = new OrderRepository(orderDb)
const orderSvc = new OrderService(orderRepo, cartRepo)
new OrderController(orderSvc, router)

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