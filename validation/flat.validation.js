const Joi = require('joi');

const flatValidation = Joi.object({
    adj: Joi.number().required(),
    condition: Joi.string().trim().required()
});

module.exports = { flatValidation };
