const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Discount = defineModel(sequelize, DataTypes, 'Discount', 'discounts', {
        discount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        finish_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    });

    Discount.associate = (models) => {
        Discount.hasMany(models.Booking, {
            foreignKey: 'discount_id',
            as: 'bookings'
        });
    };

    return Discount;
};
