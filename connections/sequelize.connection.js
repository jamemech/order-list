import { Sequelize } from 'sequelize'

export class Connection {
  constructor(config, env) {
    const dbConfig = config[env]
    return new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      ...dbConfig,
    })
  }
}