const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Booking = defineModel(sequelize, DataTypes, 'Booking', 'bookings', {
        card_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        finished: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        payment_methood_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        delivery_method_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        delivery_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        discount_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: null
        },
        status_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        }
    });

    Booking.associate = (models) => {
        Booking.belongsTo(models.CustomerCard, {
            foreignKey: 'card_id',
            as: 'card'
        });
        Booking.belongsTo(models.PaymentMethod, {
            foreignKey: 'payment_methood_id',
            as: 'paymentMethod'
        });
        Booking.belongsTo(models.DeliveryMethod, {
            foreignKey: 'delivery_method_id',
            as: 'deliveryMethod'
        });
        Booking.belongsTo(models.DeliveryMethod, {
            foreignKey: 'delivery_id',
            as: 'delivery'
        });
        Booking.belongsTo(models.Discount, {
            foreignKey: 'discount_id',
            as: 'discount'
        });
    };

    return Booking;
};
