module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            transaction: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true,
            },
            total_cost: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            status: {
                allowNull: true,
                type: Sequelize.STRING,
                defaultValue: 'Paid',
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
        await queryInterface.dropTable('orders')
    }
}
