'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            lastName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            patronymic: {
                type: Sequelize.STRING
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            phoneNumber: {
                allowNull: false,
                type: Sequelize.STRING
            },
            address: {
                allowNull: false,
                type: Sequelize.STRING
            },
            postcode: {
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
        return queryInterface.dropTable('Users');
    }
};