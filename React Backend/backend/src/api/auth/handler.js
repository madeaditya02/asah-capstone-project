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

  async refreshToken(request, h) {
    this.validator.validateRefreshPayload(request.payload);
    const { refreshToken } = request.payload;

    await this.service.verifyRefreshToken(refreshToken);
    const decoded = await this.service.verifyJwtRefresh(refreshToken);

    const newAccessToken = await this.service.generateAccessToken({
      id_user: decoded.id_user,
      nama: decoded.nama,
      peran: decoded.peran,
    });

    const response = h.response({
      status: "success",
      message: "Token berhasil diperbarui",
      data: {
        accessToken: newAccessToken,
      },
    });
    return response;
  };

  async logout(request, h) {
    this.validator.validateLogoutPayload(request.payload);
    const { refreshToken } = request.payload;

    await this.service.deleteRefreshToken(refreshToken);

    const response = h.response({
      status: "success",
      message: "Berhasil logout",
    });
    return response;
  };

  async logoutAll(request, h) {
    this.validator.validateLogoutAllPayload(request.payload);
    const { id_user } = request.payload;

    await this.service.deleteAllRefreshTokenByUser(id_user);

    const response = h.response({
      status: "success",
      message: "Berhasil logout dari semua perangkat",
    });
    return response;
  };

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