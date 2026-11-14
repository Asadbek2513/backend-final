const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const CartItem = defineModel(sequelize, DataTypes, 'CartItem', 'cart_items', {
        ticket_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Ticket, {
            foreignKey: 'ticket_id',
            as: 'ticket'
        });
        CartItem.belongsTo(models.Cart, {
            foreignKey: 'cart_id',
            as: 'cart'
        });
    };

    return CartItem;
};
