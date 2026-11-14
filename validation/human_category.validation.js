const Joi = require('joi');
const { id } = require('./common.validation');

const humanCategoryValidation = Joi.object({
    name: Joi.string().trim().required(),
    start_age: Joi.number().required(),
    finish_age: Joi.number().required(),
    gender_id: id.required()
});

module.exports = { humanCategoryValidation };
