const fs = require('fs')
const path = require('path')

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            image: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            status: {
                allowNull: false,
                type: Sequelize.STRING,
                defaultValue: 'Inactive',
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        })
    },

    async down(queryInterface, Sequelize) {
        const uploadsDir = path.resolve('uploads')

        if (fs.existsSync(uploadsDir)) {
            fs.readdirSync(uploadsDir).forEach(file => {
                fs.unlinkSync(path.join(uploadsDir, file))
            })
        }

        await queryInterface.dropTable('products')
    }
}
