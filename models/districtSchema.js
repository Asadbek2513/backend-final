const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const District = defineModel(sequelize, DataTypes, 'District', 'districts', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    District.associate = (models) => {
        District.belongsTo(models.Region, {
            foreignKey: 'region_id',
            as: 'region'
        });
        District.hasMany(models.CustomerAddress, {
            foreignKey: 'district_id',
            as: 'customerAddresses'
        });
        District.hasMany(models.Venue, {
            foreignKey: 'district_id',
            as: 'venues'
        });
    };

    return District;
};
