const Joi = require('joi');
const { id } = require('./common.validation');

const customerCardValidation = Joi.object({
    customer_id: id.required(),
    name: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    number: Joi.string().trim().required(),
    year: Joi.number().integer().positive().required(),
    month: Joi.number().integer().positive().required(),
    is_active: Joi.boolean().optional(),
    is_main: Joi.boolean().optional()
});

module.exports = { customerCardValidation };
