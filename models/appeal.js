'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appeal = sequelize.define('Appeal', {
        disturbanceID: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        userID: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        dateTime: {
            allowNull: false,
            type: DataTypes.DATE
        },
        coordinates: {
            allowNull: false,
            type: DataTypes.STRING
        },
        numberCar: {
            allowNull: false,
            type: DataTypes.STRING
        },
        status: {
            allowNull: false,
            defaultValue: 0,
            type: DataTypes.INTEGER
        },
        linkAppeal: {
            allowNull: false,
            type: DataTypes.STRING
        },
    }, {});
    Appeal.associate = function (models) {
        Appeal.belongsTo(models.User, {
            foreignKey: 'userID',
            as: 'user'
        });
        Appeal.belongsTo(models.Disturbance, {
            foreignKey: 'disturbanceID',
            as: 'disturbance'
        });
        Appeal.hasMany(models.Image, {
            foreignKey: 'appealID',
            as: 'images',
        });
    };
    return Appeal;
};