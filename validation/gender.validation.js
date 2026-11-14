const Joi = require('joi');

const genderValidation = Joi.object({
    name: Joi.string().trim().required()
});

module.exports = { genderValidation };
