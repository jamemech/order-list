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
            type: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            image: {
                allowNull: true,
                type: DataTypes.STRING,
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING,
                defaultValue: 'Inactive',
                validate: {
                    isIn: [['Active', 'Inactive']],
                },
            },
        }, {
            tableName: 'products',
            timestamps: true,
            underscored: true,
        })
    }
}
