
const {
  LoginPayloadSchema,
  ForgotPasswordPayloadSchema,
  ResetPasswordPayloadSchema,
} = require('./schema');

const InvariantError = require('../../exceptions/InvariantError');

const AuthValidator = {
  validateLoginPayload: (payload) => {
    const { error } = LoginPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateForgotPasswordPayload: (payload) => {
    const { error } = ForgotPasswordPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

  validateResetPasswordPayload: (payload) => {
    const { error } = ResetPasswordPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = AuthValidator;
