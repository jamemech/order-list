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
            tableName: 'Carts',
            timestamps: true,
            underscored: true,
        })
    }
}
