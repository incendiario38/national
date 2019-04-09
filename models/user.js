'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patronymic: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {});
    User.associate = function (models) {
        User.hasMany(models.Appeal, {
            foreignKey: 'userID',
            as: 'appeals',
        });
    };
    return User;
};