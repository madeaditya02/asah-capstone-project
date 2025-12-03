const autoBind = require("auto-bind");
const ClientError = require("../../exceptions/ClientError");
const AuthorizationError = require("../../exceptions/AuthorizationError");

class SalesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    autoBind(this);
  }

  async getAllSales(request, h) {
    try {
      const { peran } = request.auth.credentials;

      if (peran !== "admin") {
        throw new AuthorizationError("Hanya admin yang boleh melihat data sales");
      }

      const { search = "" } = request.query;
      const sales = await this.service.getAllSales({ search });

      return h.response({
        status: "success",
        data: sales,
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

  async getSalesById(request, h) {
    try {
      const { peran } = request.auth.credentials;

      if (peran !== "admin") {
        throw new AuthorizationError("Hanya admin yang boleh mengakses detail sales");
      }

      const { id } = request.params;
      const sales = await this.service.getSalesById(id);

      return h.response({
        status: "success",
        data: sales,
      });
    } catch (error) {
      return this._handleError(h, error);
    }
  }

  async createSales(request, h) {
    try {
      const { peran } = request.auth.credentials;

      if (peran !== "admin") {
        throw new AuthorizationError("Hanya admin yang boleh membuat data sales");
      }

      this.validator.validateCreatePayload(request.payload);

      const id = await this.service.createSales(request.payload);

      return h.response({
        status: "success",
        message: "Akun sales berhasil dibuat",
        data: { id },
      }).code(201);
    } catch (error) {
      return this._handleError(h, error);
    }
  }

  async updateSales(request, h) {
    try {
      const { peran } = request.auth.credentials;

      if (peran !== "admin") {
        throw new AuthorizationError("Hanya admin yang boleh mengubah data sales");
      }

      this.validator.validateUpdatePayload(request.payload);

      const { id } = request.params;
      await this.service.updateSales(id, request.payload);

      return {
        status: "success",
        message: "Data sales berhasil diperbarui",
      };
    } catch (error) {
      return this._handleError(h, error);
    }
  }

  async deleteSales(request, h) {
    try {
      const { peran } = request.auth.credentials;

      if (peran !== "admin") {
        throw new AuthorizationError("Hanya admin yang boleh menghapus sales");
      }

      const { id } = request.params;
      await this.service.deleteSales(id);

      return {
        status: "success",
        message: "Akun sales berhasil dihapus",
      };
    } catch (error) {
      return this._handleError(h, error);
    }
  }

  _handleError(h, error) {
    if (error instanceof ClientError) {
      return h.response({
        status: "fail",
        message: error.message,
      }).code(error.statusCode);
    }

    console.error(error);
    return h.response({
      status: "error",
      message: "Terjadi kegagalan pada server",
    }).code(500);
  }
}

module.exports = SalesHandler;
