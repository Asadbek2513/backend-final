const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Ticket = defineModel(sequelize, DataTypes, 'Ticket', 'tickets', {
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        seat_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        service_fee: {
            type: DataTypes.DECIMAL(12, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        status_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ticket_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Ticket.associate = (models) => {
        Ticket.belongsTo(models.Event, {
            foreignKey: 'event_id',
            as: 'event'
        });
        Ticket.belongsTo(models.Seat, {
            foreignKey: 'seat_id',
            as: 'seat'
        });
        Ticket.belongsTo(models.TicketStatus, {
            foreignKey: 'status_id',
            as: 'status'
        });
        Ticket.belongsTo(models.TicketType, {
            foreignKey: 'ticket_type_id',
            as: 'ticketType'
        });
        Ticket.hasMany(models.CartItem, {
            foreignKey: 'ticket_id',
            as: 'cartItems'
        });
    };

    return Ticket;
};
