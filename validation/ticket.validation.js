const Joi = require('joi');
const { id } = require('./common.validation');

const ticketValidation = Joi.object({
    event_id: id.required(),
    seat_id: id.required(),
    price: Joi.number().required(),
    service_fee: Joi.number().required(),
    status_id: id.required(),
    ticket_type_id: id.required()
});

module.exports = { ticketValidation };
