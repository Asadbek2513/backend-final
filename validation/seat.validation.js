const Joi = require('joi');
const { id } = require('./common.validation');

const seatValidation = Joi.object({
    sector_id: id.required(),
    row_number: Joi.number().required(),
    number: Joi.number().required(),
    venue_id: id.required(),
    seat_type_id: id.required(),
    location_in_schema: Joi.string().trim().required()
});

module.exports = { seatValidation };
