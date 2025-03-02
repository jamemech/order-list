import { DataTypes } from 'sequelize'

export class Order {
    constructor(connection) {
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
            user: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            total_cost: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            status: {
                allowNull: false,
                type: DataTypes.ENUM('Paid', 'Complete'),
            },
        }, {
            tableName: 'Orders',
            timestamps: true,
            underscored: true,
        })
    }
}
