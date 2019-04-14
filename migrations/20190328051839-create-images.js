'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Images', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            appealId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Appeals',
                    key: 'id'
                }
            },
            linkImage: {
                allowNull: false,
                type: Sequelize.STRING
            },
            kind: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Images');
    }
};