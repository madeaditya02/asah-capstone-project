const {
  LoginPayloadSchema,
  ForgotPasswordPayloadSchema,
  ResetPasswordPayloadSchema,
  RefreshTokenPayloadSchema,
  LogoutPayloadSchema,
  LogoutAllPayloadSchema,
} = require("./schema");

const InvariantError = require("../../exceptions/InvariantError");

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

  validateRefreshPayload: (payload) => {
    const { error } = RefreshTokenPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },

 
  validateLogoutPayload: (payload) => {
    const { error } = LogoutPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },


  validateLogoutAllPayload: (payload) => {
    const { error } = LogoutAllPayloadSchema.validate(payload);
    if (error) {
      throw new InvariantError(error.message);
    }
  },
};

module.exports = AuthValidator;
