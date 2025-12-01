// src/api/sales/handler.js
const SalesService = require('../../services/SalesService');
const SalesValidator = require('../../validator/sales');
const ClientError = require('../../exceptions/ClientError');

const SalesHandler = {
  
  getAllSales: async (request, h) => {
    try {
      const result = await SalesService.getAllSales();
      return h.response({
        status: 'success',
        data: result,
      }).code(200);
    } catch (error) {
      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },

  createSales: async (request, h) => {
    try {
      SalesValidator.validateCreatePayload(request.payload);

      const result = await SalesService.createSales(request.payload);
      return h.response({
        status: 'success',
        message: 'Sales berhasil dibuat',
        data: result,
      }).code(201);

    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },

  updateSales: async (request, h) => {
    try {
      SalesValidator.validateUpdatePayload(request.payload);

      const { id } = request.params;

      const result = await SalesService.updateSales(id, request.payload);

      return h.response({
        status: 'success',
        message: 'Data sales berhasil diperbarui',
        data: result,
      }).code(200);

    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },

  deleteSales: async (request, h) => {
    try {
      const { id } = request.params;

      const result = await SalesService.deleteSales(id);

      return h.response({
        status: 'success',
        message: 'Data sales berhasil dihapus',
        data: result,
      }).code(200);

    } catch (error) {
      if (error instanceof ClientError) {
        return h.response({
          status: 'fail',
          message: error.message,
        }).code(error.statusCode);
      }

      console.error(error);
      return h.response({
        status: 'error',
        message: 'Terjadi kesalahan pada server',
      }).code(500);
    }
  },

};

module.exports = SalesHandler;
