const Joi = require('joi');

const discountValidation = Joi.object({
    discount: Joi.string().trim().required(),
    finish_date: Joi.date().iso().allow(null).optional()
});

module.exports = { discountValidation };
