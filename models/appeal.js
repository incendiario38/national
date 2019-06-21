'use strict';
module.exports = (sequelize, DataTypes) => {
    let Appeal = sequelize.define('Appeal', {
        datetime: {
            type: DataTypes.DATE,
            validate: {
                notEmpty: true,
            }
        },
        coordinates: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        numberCar: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: {
                    args: [6, 9],
                    msg: "Number car must be between 6 and 9 characters in length"
                }
            }
        },
        status: {
            defaultValue: 0,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            }
        },
        linkAppeal: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
    }, {});
    Appeal.associate = (models) => {
        models.Appeal.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            },
            as: 'user'
        });
        models.Appeal.belongsTo(models.Disturbance, {
            foreignKey: {
                allowNull: false
            },
            as: 'disturbance'
        });
        models.Appeal.hasMany(models.Image, {
            foreignKey: 'appealId',
            as: 'images'
        });
    };
    return Appeal;
};