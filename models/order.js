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
                unique: true,
            },
            total_cost: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            status: {
                allowNull: true,
                type: DataTypes.STRING,
                defaultValue: 'Paid',
                validate: {
                    isIn: [['Paid', 'Refunded', 'Complete']],
                },
            },
        }, {
            tableName: 'orders',
            timestamps: true,
            underscored: true,
        })
    }
}
