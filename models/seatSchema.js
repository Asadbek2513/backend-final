const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Seat = defineModel(sequelize, DataTypes, 'Seat', 'seats', {
        sector_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        row_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        venue_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seat_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        location_in_schema: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Seat.associate = (models) => {
        Seat.belongsTo(models.Sector, {
            foreignKey: 'sector_id',
            as: 'sector'
        });
        Seat.belongsTo(models.Venue, {
            foreignKey: 'venue_id',
            as: 'venue'
        });
        Seat.belongsTo(models.SeatType, {
            foreignKey: 'seat_type_id',
            as: 'seatType'
        });
        Seat.hasMany(models.Ticket, {
            foreignKey: 'seat_id',
            as: 'tickets'
        });
    };

    return Seat;
};
