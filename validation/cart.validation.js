const Joi = require('joi');
const { id } = require('./common.validation');

const cartValidation = Joi.object({
    customer_id: id.allow(null).optional(),
    createdAt: Joi.date().iso().optional(),
    finishedAt: Joi.date().iso().allow(null).optional(),
    status_id: Joi.string().optional()
});

module.exports = { cartValidation };
