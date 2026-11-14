const Joi = require('joi');
const { id } = require('./common.validation');

const eventValidation = Joi.object({
    name: Joi.string().trim().required(),
    photo: Joi.string().trim().required(),
    start_date: Joi.date().iso().required(),
    start_time: Joi.string().trim().required(),
    finish_date: Joi.date().iso().required(),
    finish_time: Joi.string().trim().required(),
    info: Joi.string().required(),
    event_type_id: id.required(),
    human_category_id: id.required(),
    venue_id: id.required(),
    lang_id: id.required(),
    release_date: Joi.date().iso().required()
});

module.exports = { eventValidation };
