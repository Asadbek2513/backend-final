const Joi = require('joi');
const { id } = require('./common.validation');

const venuePhotoValidation = Joi.object({
    venueId: id.required(),
    url: Joi.string().trim().required()
});

module.exports = { venuePhotoValidation };
