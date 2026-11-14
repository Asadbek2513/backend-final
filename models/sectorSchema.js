const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Sector = defineModel(sequelize, DataTypes, 'Sector', 'sectors', {
        sector_name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Sector.associate = (models) => {
        Sector.hasMany(models.Seat, {
            foreignKey: 'sector_id',
            as: 'seats'
        });
    };

    return Sector;
};
