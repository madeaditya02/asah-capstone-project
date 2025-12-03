const autoBind = require("auto-bind");
const ClientError = require("../../exceptions/ClientError");

class AuthHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    autoBind(this);
  }

 
  async login(request, h) {
    try {
      this.validator.validateLoginPayload(request.payload);
      const result = await this.service.login(request.payload);

      return h
        .response({
          status: "success",
          message: "Login berhasil",
          data: result,
        })
        .code(200);
    } catch (error) {
      return this._handleError(h, error);
    }
  }

 
  async refreshToken(request, h) {
    try {
      this.validator.validateRefreshPayload(request.payload);
      const { refreshToken } = request.payload;

      // verify refresh token
      await this.service.verifyRefreshToken(refreshToken);

      const decoded = await this.service.verifyJwtRefresh(refreshToken);

      const newAccessToken = await this.service.generateAccessToken({
        id_user: decoded.id_user,
        nama: decoded.nama,
        peran: decoded.peran,
      });

      return h.response({
        status: "success",
        message: "Token berhasil diperbarui",
        data: { accessToken: newAccessToken },
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

 
  async logout(request, h) {
    try {
      this.validator.validateLogoutPayload(request.payload);
      const { refreshToken } = request.payload;

      await this.service.deleteRefreshToken(refreshToken);

      return h.response({
        status: "success",
        message: "Berhasil logout",
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

 
  async logoutAll(request, h) {
    try {
      this.validator.validateLogoutAllPayload(request.payload);
      const { id_user } = request.payload;

      await this.service.deleteAllRefreshTokenByUser(id_user);

      return h.response({
        status: "success",
        message: "Berhasil logout dari semua perangkat",
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

 
  async forgotPassword(request, h) {
    try {
      this.validator.validateForgotPasswordPayload(request.payload);

      const result = await this.service.forgotPassword(request.payload);

      return h.response({
        status: "success",
        message: "Tautan reset kata sandi berhasil dibuat",
        data: result,
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

  
  async resetPassword(request, h) {
    try {
      this.validator.validateResetPasswordPayload(request.payload);

      const result = await this.service.resetPassword(request.payload);

      return h.response({
        status: "success",
        message: "Kata sandi berhasil diubah",
        data: result,
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

 
  _handleError(h, error) {
    if (error instanceof ClientError) {
      return h
        .response({
          status: "fail",
          message: error.message,
        })
        .code(error.statusCode);
    }

    console.error(error);
    return h
      .response({
        status: "error",
        message: "Terjadi kegagalan pada server",
      })
      .code(500);
  }
}

module.exports = AuthHandler;
