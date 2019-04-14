'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Appeals', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            disturbanceId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Disturbances',
                    key: 'id'
                }
            },
            datetime: {
                allowNull: false,
                type: Sequelize.DATE
            },
            coordinates: {
                allowNull: false,
                type: Sequelize.STRING
            },
            numberCar: {
                allowNull: false,
                type: Sequelize.STRING
            },
            status: {
                allowNull: false,
                defaultValue: 0,
                type: Sequelize.INTEGER
            },
            linkAppeal: {
                allowNull: false,
                type: Sequelize.STRING
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
        return queryInterface.dropTable('Appeals');
    }
};