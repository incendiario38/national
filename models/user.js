'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: DataTypes.STRING,
        patronymic: DataTypes.STRING,
        email: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        address: DataTypes.STRING,
        postcode: DataTypes.STRING
    }, {});
    User.associate = function (models) {
        User.hasMany(models.Appeal, {
            foreignKey: 'userID',
            as: 'appeals',
        });
    };
    return User;
};