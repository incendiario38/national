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
        models.Image.belongsTo(models.Appeal, {
            foreignKey: {
                allowNull: false
            },
            as: 'appeal'
        });
    };

    return Image;
};