const Joi = require('joi');



const password = (value, helpers) => {
  if (
    !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      value
    )
  ) {
    return helpers.message(
      "Password must be 8 chars, include upper, lower, number & special char"
    );
  }
  return value;
};

const register = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password),
});


const qoutesRegister = Joi.object({
  /* BASIC INFO */
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().required(),
  maritalStatus: Joi.string().required(),
  /* CONTACT */
  email: Joi.string().email().required(),
  emailVerified: Joi.boolean().default(false),
  phone: Joi.string().required(),
  phoneVerified: Joi.boolean().default(false),
  /* AUTH */
  password: Joi.string().required().custom(password),
  /* ADDRESS */
  address: Joi.string().required(),
  unit: Joi.string().allow("", null),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  isTexas: Joi.boolean().required(),
  /* PRODUCTS */
  products: Joi.array().items(Joi.string()).min(1).required(),
  /* MEMBERS */
  members: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      relationship: Joi.string().required(),
      method: Joi.string().valid("invite", "manual").required(),
      inviteType: Joi.when("method", {
        is: "invite",
        then: Joi.string().valid("email", "phone").required(),
        otherwise: Joi.forbidden(),
      }),
      email: Joi.when("inviteType", {
        is: "email",
        then: Joi.string().email().required(),
        otherwise: Joi.forbidden(),
      }),
      phone: Joi.when("inviteType", {
        is: "phone",
        then: Joi.string().required(),
        otherwise: Joi.forbidden(),
      }),
    })
  ).default([]),
  /* DYNAMIC QUESTIONS */
  answers: Joi.object().default({}),
  signatureData: Joi.string().required(),
});

const notifyAdmin = Joi.object({
  /* BASIC INFO */
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.date().required(),
  gender: Joi.string().required(),
  maritalStatus: Joi.string().required(),
  /* CONTACT */
  email: Joi.string().email().required(),
  emailVerified: Joi.boolean().default(false),
  phone: Joi.string().required(),
  phoneVerified: Joi.boolean().default(false),
  /* AUTH */
  password: Joi.string().required().custom(password),
  /* ADDRESS */
  address: Joi.string().required(),
  unit: Joi.string().allow("", null),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zipCode: Joi.string().required(),
  isTexas: Joi.boolean().required(),

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
  otp: Joi.string().max(4).min(4).required(),
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
  phoneVerify,
  qoutesRegister,
  notifyAdmin
};
