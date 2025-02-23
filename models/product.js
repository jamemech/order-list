import { DataTypes } from 'sequelize'

export class Product {
    constructor(connection) {
        return connection.define('Product', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            image: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.ENUM('active', 'inactive'),
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        }, {
            tableName: 'Products',
        })
    }
}