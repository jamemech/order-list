import { Sequelize } from 'sequelize'

export class connection {
    constructor(dbConfig) {
        return new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
            host: dbConfig.development.host,
            port: dbConfig.development.port,
            dialect: 'postgres',
            logging: false,
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        })
    }
}