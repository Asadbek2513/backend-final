const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const CustomerCard = defineModel(sequelize, DataTypes, 'CustomerCard', 'customer_cards', {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.STRING,
            allowNull: false
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        is_main: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    CustomerCard.associate = (models) => {
        CustomerCard.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer'
        });
        CustomerCard.hasMany(models.Booking, {
            foreignKey: 'card_id',
            as: 'bookings'
        });
    };

    return CustomerCard;
};
