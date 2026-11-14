const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const SeatType = defineModel(sequelize, DataTypes, 'SeatType', 'seat_types', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    SeatType.associate = (models) => {
        SeatType.hasMany(models.Seat, {
            foreignKey: 'seat_type_id',
            as: 'seats'
        });
    };

    return SeatType;
};
