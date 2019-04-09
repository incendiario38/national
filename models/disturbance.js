'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disturbance = sequelize.define('Disturbance', {
        kind: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});
    Disturbance.associate = function (models) {
        Disturbance.hasMany(models.Appeal, {
            foreignKey: 'disturbanceID',
            as: 'appeals'
        });
    };
    return Disturbance;
};