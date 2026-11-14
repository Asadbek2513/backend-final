const Joi = require('joi');
const { id } = require('./common.validation');

const bookingValidation = Joi.object({
    card_id: id.required(),
    createdAt: Joi.date().iso().optional(),
    finished: Joi.date().iso().allow(null).optional(),
    payment_methood_id: id.required(),
    delivery_method_id: id.allow(null).optional(),
    delivery_id: id.allow(null).optional(),
    discount_id: id.allow(null).optional(),
    status_id: Joi.string().optional()
});

module.exports = { bookingValidation };
