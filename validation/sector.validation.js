const Joi = require('joi');

const sectorValidation = Joi.object({
    sector_name: Joi.string().trim().required()
});

module.exports = { sectorValidation };
