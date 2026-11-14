const { CartItem, createSearchWhere, getAssociationOptions } = require('../models');

exports.postCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.create(req.body);
        return res.status(201).json(await CartItem.findByPk(
            cartItem.id,
            getAssociationOptions(CartItem)
        ));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getCartItems = async (req, res) => {
    try {
        return res.status(200).json(await CartItem.findAll(getAssociationOptions(CartItem)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getCartItemById = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(
            req.params.id,
            getAssociationOptions(CartItem)
        );
        if (!cartItem) return res.status(404).json(
            { 
                success: false, 
                message: "Savat elementi topilmadi" 
            }
        );
        return res.status(200).json(cartItem);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateCartItem = async (req, res) => {
    try {
        const cartItem = await CartItem.findByPk(req.params.id);
        if (!cartItem) return res.status(404).json(
            { 
                success: false, 
                message: "Savat elementi topilmadi" 
            }
        );
        await cartItem.update(req.body);
        return res.status(200).json(await CartItem.findByPk(
            req.params.id,
            getAssociationOptions(CartItem)
        ));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.searchCartItems = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(CartItem, query, [
            '$ticket.event.name$',
            '$ticket.status.name$',
            '$ticket.ticketType.ticket_type$',
            '$cart.customer.first_name$',
            '$cart.customer.last_name$',
            '$cart.customer.email$'
        ]);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Savat elementi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await CartItem.findAll(getAssociationOptions(CartItem, {
            where,
            include: [
                {
                    association: CartItem.associations.ticket,
                    include: [
                        { 
                            association: CartItem.associations.ticket.target.associations.event 
                        },
                        { 
                            association: CartItem.associations.ticket.target.associations.status 
                        },
                        { 
                            association: CartItem.associations.ticket.target.associations.ticketType 
                        }
                    ]
                },
                {
                    association: CartItem.associations.cart,
                    include: [{
                        association: CartItem.associations.cart.target.associations.customer,
                        attributes: { 
                            exclude: [
                                'hashed_password', 
                                'hashed_refresh_token'
                            ] 
                        }
                    }]
                }
            ]
        })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteCartItem = async (req, res) => {
    try {
        const deleted = await CartItem.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Savat elementi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Savat elementi o'chirildi" 
            }
        );
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};
