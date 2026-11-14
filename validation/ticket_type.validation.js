const Joi = require('joi');

const ticketTypeValidation = Joi.object({
    ticket_type: Joi.string().trim().required()
});

module.exports = { ticketTypeValidation };
