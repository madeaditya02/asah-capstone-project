const Joi = require('joi');

const LoginPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().min(6).required(),
});

const ForgotPasswordPayloadSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
});

const ResetPasswordPayloadSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});

module.exports = {
  LoginPayloadSchema,
  ForgotPasswordPayloadSchema,
  ResetPasswordPayloadSchema,
};
