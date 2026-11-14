const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const TicketType = defineModel(sequelize, DataTypes, 'TicketType', 'ticket_types', {
        ticket_type: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    TicketType.associate = (models) => {
        TicketType.hasMany(models.Ticket, {
            foreignKey: 'ticket_type_id',
            as: 'tickets'
        });
    };

    return TicketType;
};
