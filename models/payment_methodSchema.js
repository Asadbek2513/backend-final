const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const PaymentMethod = defineModel(sequelize, DataTypes, 'PaymentMethod', 'payment_methods', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    PaymentMethod.associate = (models) => {
        PaymentMethod.hasMany(models.Booking, {
            foreignKey: 'payment_methood_id',
            as: 'bookings'
        });
    };

    return PaymentMethod;
};
