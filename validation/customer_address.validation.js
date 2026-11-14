const Joi = require('joi');
const { id } = require('./common.validation');

const customerAddressValidation = Joi.object({
    customer_id: id.required(),
    name: Joi.string().trim().required(),
    region_id: id.required(),
    district_id: id.required(),
    street: Joi.string().trim().required(),
    house: Joi.string().trim().required(),
    flat_id: id.allow(null).optional(),
    location: Joi.string().trim().required(),
    post_index: Joi.string().trim().required(),
    info: Joi.string().allow(null).optional()
});

module.exports = { customerAddressValidation };
