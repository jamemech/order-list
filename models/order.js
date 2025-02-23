import { DataTypes } from 'sequelize'

export const Order = (connection) => {
    return connection.define('Order', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        transaction: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        amount: {
            allowNull: false,
            type: DataTypes.FLOAT,
        },
        user: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        status: {
            allowNull: false,
            type: DataTypes.ENUM('paid', 'refunded', 'complete'),
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
        tableName: 'Orders',
    })
}