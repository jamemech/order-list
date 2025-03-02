'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            transaction: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            user: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            total_cost: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM('Paid', 'Complete'),
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
        await queryInterface.dropTable('Orders')
    }
}
