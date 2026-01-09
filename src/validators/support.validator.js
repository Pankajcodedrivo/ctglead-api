const Joi = require('joi');

const supportValidation = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.optional(),
    message: Joi.optional()
});

module.exports = {
    supportValidation
};
