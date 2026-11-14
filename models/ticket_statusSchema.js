const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const TicketStatus = defineModel(sequelize, DataTypes, 'TicketStatus', 'ticket_statuses', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    TicketStatus.associate = (models) => {
        TicketStatus.hasMany(models.Ticket, {
            foreignKey: 'status_id',
            as: 'tickets'
        });
    };

    return TicketStatus;
};
