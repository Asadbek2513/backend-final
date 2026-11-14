const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Flat = defineModel(sequelize, DataTypes, 'Flat', 'flats', {
        adj: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        condition: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Flat.associate = (models) => {
        Flat.hasMany(models.CustomerAddress, {
            foreignKey: 'flat_id',
            as: 'customerAddresses'
        });
    };

    return Flat;
};
