'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appeal = sequelize.define('Appeal', {
        disturbanceID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        coordinates: {
            type: DataTypes.STRING,
            allowNull: false
        },
        numberCar: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        linkAppeal: {
            type: DataTypes.STRING,
            allowNull: false
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
        Appeal.hasMany(models.Images, {
            foreignKey: 'appealID',
            as: 'images',
        });
    };
    return Appeal;
};