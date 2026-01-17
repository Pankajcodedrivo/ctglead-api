const Joi = require('joi');

const pagination = Joi.object({
  limit: Joi.string().optional(),
  page: Joi.string().required(),
});

const addCareer = Joi.object({
  careerName: Joi.string().required().messages({
    'any.required': 'Career name is required.',
  }),
});

const updateCareer = Joi.object({});

const singleId = Joi.object({
  id: Joi.string().required(),
});

const singleUserId = Joi.object({
  id: Joi.string().required(),
  limit: Joi.string().optional(),
  page: Joi.string().required(),
});

module.exports = {
  pagination,
  addCareer,
  singleId,
  updateCareer,
  singleUserId
};
