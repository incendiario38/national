'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'password', {
            allowNull: false,
            type: Sequelize.STRING(1000),
            validate: {
                len: [6, 32],
                notEmpty: true
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Users', 'password');
    }
};
