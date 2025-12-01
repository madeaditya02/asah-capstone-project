const { default: autoBind } = require("auto-bind");

class AuthHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async login(request, h) {
    this.validator.validateLoginPayload(request.payload);
    const result = await this.service.login(request.payload);

    const response = h.response({
      status: "success",
      message: "Login berhasil",
      data: {
        result,
      },
    });
    return response;
  };

  async logout(h) {
    const response = h.response({
      status: "success",
      message: "Logout berhasil",
    });
    return response;
  }

  async forgotPassword(request, h) {
    this.validator.validateForgotPasswordPayload(request.payload);
    const result = await this.service.forgotPassword(request.payload);

    const response = h.response({
      status: "success",
      message: "Tautan reset kata sandi berhasil dibuat",
      data: result, 
    });
    return response;
  };

  async resetPassword(request, h) {
    this.validator.validateResetPasswordPayload(request.payload);
    const result = await this.service.resetPassword(request.payload);

     const response = h.response({
      status: "success",
      message: "Kata sandi berhasil diubah",
      data: result, 
    });
    return response;
  };
};

module.exports = AuthHandler;
