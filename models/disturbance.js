'use strict';
module.exports = (sequelize, DataTypes) => {
    const Disturbance = sequelize.define('Disturbance', {
        kind: DataTypes.STRING
    }, {});
    Disturbance.associate = function (models) {
        Disturbance.hasMany(models.Appeal, {
            foreignKey: 'disturbanceID',
            as: 'appeals'
        });
    };
    return Disturbance;
};