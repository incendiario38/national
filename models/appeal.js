'use strict';
module.exports = (sequelize, DataTypes) => {
    const Appeal = sequelize.define('Appeal', {
        disturbanceID: DataTypes.INTEGER,
        userID: DataTypes.INTEGER,
        dateTime: DataTypes.DATE,
        coordinates: DataTypes.STRING,
        numberCar: DataTypes.STRING,
        status: DataTypes.INTEGER,
        linkAppeal: DataTypes.STRING
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