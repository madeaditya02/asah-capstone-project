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


const RefreshTokenPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});


const LogoutPayloadSchema = Joi.object({
  refreshToken: Joi.string().required(),
});


const LogoutAllPayloadSchema = Joi.object({
  id_user: Joi.string().required(),
});

module.exports = {
  LoginPayloadSchema,
  ForgotPasswordPayloadSchema,
  ResetPasswordPayloadSchema,
  RefreshTokenPayloadSchema,
  LogoutPayloadSchema,
  LogoutAllPayloadSchema,
};
