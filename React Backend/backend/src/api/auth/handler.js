const { default: autoBind } = require("auto-bind");

class AuthHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  // login
  
  async login(request, h) {
    this.validator.validateLoginPayload(request.payload);
    const result = await this.service.login(request.payload);

    return h.response({
      status: "success",
      message: "Login berhasil",
      data: result,
    });
  }

 
  // refresh token
  
  async refreshToken(request, h) {
    this.validator.validateRefreshPayload(request.payload);

    const { refreshToken } = request.payload;


    const idUser = await this.service.verifyRefreshToken(refreshToken);


    const decoded = await this.service.verifyJwtRefresh(refreshToken);

 
    const newAccessToken = await this.service.generateAccessToken({
      id_user: decoded.id_user,
      nama: decoded.nama,
      peran: decoded.peran,
    });

    return h.response({
      status: "success",
      message: "Token berhasil diperbarui",
      data: {
        accessToken: newAccessToken,
      },
    });
  }


  //   logout


  async logout(request, h) {
    this.validator.validateLogoutPayload(request.payload);

    const { refreshToken } = request.payload;

    await this.service.deleteRefreshToken(refreshToken);

    return h.response({
      status: "success",
      message: "Berhasil logout",
    });
  }

 
  //   logout dari semua perangkat user
 

  async logoutAll(request, h) {
    this.validator.validateLogoutAllPayload(request.payload);

    const { id_user } = request.payload;

    await this.service.deleteAllRefreshTokenByUser(id_user);

    return h.response({
      status: "success",
      message: "Berhasil logout dari semua perangkat",
    });
  }


  async forgotPassword(request, h) {
    this.validator.validateForgotPasswordPayload(request.payload);
    const result = await this.service.forgotPassword(request.payload);

    return h.response({
      status: "success",
      message: "Tautan reset kata sandi berhasil dibuat",
      data: result,
    });
  }


  // reset password

  async resetPassword(request, h) {
    this.validator.validateResetPasswordPayload(request.payload);
    const result = await this.service.resetPassword(request.payload);

    return h.response({
      status: "success",
      message: "Kata sandi berhasil diubah",
      data: result,
    });
  }
}

module.exports = AuthHandler;
