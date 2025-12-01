
const AuthService = require('../../services/AuthService');
const AuthValidator = require('../../validator/auth');
const ClientError = require('../../exceptions/ClientError');

const AuthHandler = {
  login: async (request, h) => {
    try {
      AuthValidator.validateLoginPayload(request.payload);

      const result = await AuthService.login(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Login berhasil',
        data: result,
      });

      return response.code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        return response.code(error.statusCode);
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      });
      return response.code(500);
    }
  },

  logout: async (request, h) => {
    
    const response = h.response({
      status: 'success',
      message: 'Logout berhasil',
    });
    return response.code(200);
  },

  forgotPassword: async (request, h) => {
    try {
      AuthValidator.validateForgotPasswordPayload(request.payload);

      const result = await AuthService.forgotPassword(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Tautan reset kata sandi berhasil dibuat',
        data: result, 
      });

      return response.code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        return response.code(error.statusCode);
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      });
      return response.code(500);
    }
  },

  resetPassword: async (request, h) => {
    try {
      AuthValidator.validateResetPasswordPayload(request.payload);

      const result = await AuthService.resetPassword(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Kata sandi berhasil diubah',
        data: result,
      });

      return response.code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        return response.code(error.statusCode);
      }

      console.error(error);
      const response = h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      });
      return response.code(500);
    }
  },
};

module.exports = AuthHandler;
