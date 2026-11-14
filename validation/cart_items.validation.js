const Joi = require('joi');
const { id } = require('./common.validation');

const cartItemsValidation = Joi.object({
    ticket_id: id.required(),
    cart_id: id.required()
});

module.exports = { cartItemsValidation };
