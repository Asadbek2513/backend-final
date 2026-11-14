const Joi = require('joi');
const { id } = require('./common.validation');

const venueTypeValidation = Joi.object({
    venueId: id.required(),
    typeId: id.required()
});

module.exports = { venueTypeValidation };
