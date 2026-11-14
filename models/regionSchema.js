const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Region = defineModel(sequelize, DataTypes, 'Region', 'regions', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Region.associate = (models) => {
        Region.hasMany(models.District, {
            foreignKey: 'region_id',
            as: 'districts'
        });
        Region.hasMany(models.CustomerAddress, {
            foreignKey: 'region_id',
            as: 'customerAddresses'
        });
        Region.hasMany(models.Venue, {
            foreignKey: 'region_id',
            as: 'venues'
        });
    };

    return Region;
};
