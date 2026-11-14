const Joi = require('joi');
const { id } = require('./common.validation');

const districtValidation = Joi.object({
    name: Joi.string().trim().required(),
    region_id: id.required()
});

module.exports = { districtValidation };
