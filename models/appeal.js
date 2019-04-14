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
        number_car: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        status: {
            defaultValue: 0,
            type: DataTypes.INTEGER,
            validate: {
                notEmpty: true,
            }
        },
        link_appeal: {
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
            }
        });
        models.Appeal.belongsTo(models.Disturbance, {
            foreignKey: {
                allowNull: false
            }
        });
        models.Appeal.hasMany(models.Image);
    };
    return Appeal;
};