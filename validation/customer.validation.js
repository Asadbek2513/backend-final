const Joi = require('joi');
const { id } = require('./common.validation');

const customerValidation = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    phone: Joi.string().trim().required(),
    hashed_password: Joi.string().required(),
    email: Joi.string().trim().email().required(),
    birth_date: Joi.date().iso().required(),
    gender_id: id.required(),
    lang_id: id.required(),
    hashed_refresh_token: Joi.string().allow(null).optional()
});

module.exports = { customerValidation };
