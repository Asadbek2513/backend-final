const Joi = require('joi');
const { id } = require('./common.validation');

const eventTypeValidation = Joi.object({
    name: Joi.string().trim().required(),
    parent_event_type_id: id.allow(null).optional()
});

module.exports = { eventTypeValidation };
