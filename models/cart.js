//clear

import { DataTypes } from 'sequelize'

export class Cart {
    constructor(connection) {
        return connection.define('Cart', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            order_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Order',
                    key: 'id',
                },
                onUpdate: 'RESTRICT',
                onDelete: 'RESTRICT',
            },
            product_id: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Product',
                    key: 'id',
                },
                onUpdate: 'RESTRICT',
                onDelete: 'RESTRICT',
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            price: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            piece: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            cost: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
        }, {
            tableName: 'carts',
            timestamps: true,
            underscored: true,
        })
    }
}
