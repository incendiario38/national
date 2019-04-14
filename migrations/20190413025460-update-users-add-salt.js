'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Users', 'salt', {
            allowNull: false,
            type: Sequelize.STRING(512)
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Users', 'salt');
    }
};
