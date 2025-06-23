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
                allowNull: true,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Order',
                    key: 'id',
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
            },
            product_id: {
                allowNull: true,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Product',
                    key: 'id',
                },
                onUpdate: 'SET NULL',
                onDelete: 'SET NULL',
            },
            transaction: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
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
