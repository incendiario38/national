'use strict';
module.exports = (sequelize, DataTypes) => {
    let Image = sequelize.define('Image', {
        linkImage: {
            type: DataTypes.STRING
        },
        kind: {
            type: DataTypes.INTEGER
        },
    }, {});

    Image.associate = (models) => {
        Image.belongsTo(models.Appeal, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Image;
};