const Joi = require('joi');

const regionValidation = Joi.object({
    name: Joi.string().trim().min(1).required()
});

module.exports = { regionValidation };
