const Joi = require('joi');

const id = Joi.number().integer().positive();

const createBodyValidator = (schema) => {
    const updateSchema = schema
        .fork(Object.keys(schema.describe().keys), (field) => field.optional())
        .min(1);

    return (req, res, next) => {
        const validationSchema = req.method === 'PUT' ? updateSchema : schema;
        const { error, value } = validationSchema.validate(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Xatolik yuz berdi',
                error: error.message
            });
        }

        req.body = value;
        return next();
    };
};

module.exports = { id, createBodyValidator };
