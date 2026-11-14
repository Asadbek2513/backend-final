const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const DeliveryMethod = defineModel(sequelize, DataTypes, 'DeliveryMethod', 'delivery_methods', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    DeliveryMethod.associate = (models) => {
        DeliveryMethod.hasMany(models.Booking, {
            foreignKey: 'delivery_method_id',
            as: 'methodBookings'
        });
        DeliveryMethod.hasMany(models.Booking, {
            foreignKey: 'delivery_id',
            as: 'deliveryBookings'
        });
    };

    return DeliveryMethod;
};
