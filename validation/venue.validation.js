const Joi = require('joi');
const { id } = require('./common.validation');

const venueValidation = Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    location: Joi.string().trim().required(),
    site: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    schema: Joi.string().trim().required(),
    region_id: id.required(),
    district_id: id.required()
});

module.exports = { venueValidation };
