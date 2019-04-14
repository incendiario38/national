'use strict';
module.exports = (sequelize, DataTypes) => {
    let Disturbance = sequelize.define('Disturbance', {
        kind: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }, {});

    Disturbance.associate = (models) => {
        models.Disturbance.hasMany(models.Appeal);
    };

    return Disturbance;
};