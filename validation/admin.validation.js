const Joi = require('joi');

const adminValidation = Joi.object({
    name: Joi.string().trim().required(),
    login: Joi.string().trim().required(),
    hashed_password: Joi.string().required(),
    is_active: Joi.boolean().optional(),
    is_creator: Joi.boolean().optional(),
    hashed_refresh_token: Joi.string().allow(null).optional()
});

module.exports = { adminValidation };
