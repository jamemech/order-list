//clear

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('carts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            order_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'orders',
                    key: 'id',
                },
                onUpdate: 'RESTRICT',
                onDelete: 'RESTRICT',
            },
            product_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'products',
                    key: 'id',
                },
                onUpdate: 'RESTRICT',
                onDelete: 'RESTRICT',
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.FLOAT,
            },
            piece: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            cost: {
                allowNull: false,
                type: Sequelize.FLOAT,
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
        await queryInterface.dropTable('carts')
    }
}
