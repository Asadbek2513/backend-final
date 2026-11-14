const Joi = require('joi');

const countryValidation = Joi.object({
    country_name: Joi.string().trim().required()
});

module.exports = { countryValidation };
