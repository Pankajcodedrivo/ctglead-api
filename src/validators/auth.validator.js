const Joi = require('joi');

const password = (value, helpers) => {
  if (
    !value.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    )
  ) {
    return helpers.message(
      'Password must me 8 characters long with at least one capital letter, one small letter, one digit, one special character',
    );
  }
  return value;
};

const register = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const forgot = Joi.object({
  email: Joi.string().email().required(),
});

const phoneVerify = Joi.object({
  phone: Joi.string().required(),
});

const reset = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const verify = Joi.object({
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  otpdata: Joi.string().length(4).required(),
})
  .xor("email", "phone") // only one allowed
  .required();

const tokens = Joi.object({
  token: Joi.string().required(),
});

const logout = Joi.object({
  access: Joi.string().required(),
  refresh: Joi.string().required(),
});

module.exports = {
  register,
  login,
  forgot,
  reset,
  tokens,
  logout,
  verify,
  phoneVerify
};
