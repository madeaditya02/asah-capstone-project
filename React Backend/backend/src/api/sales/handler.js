const { default: autoBind } = require("auto-bind");
const { onlyAdmin } = require("../../utils/roleCheck");

class SalesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
    autoBind(this);
  }

  
  async getAllSales(request, h) {
    const { credentials } = request.auth;
    onlyAdmin(credentials);

    const { search = "" } = request.query;
    const result = await this.service.getAllSales({ search });

    return h.response({
      status: "success",
      data: result,
    }).code(200);
  }

  
  async getSalesById(request, h) {
    const { credentials } = request.auth;
    onlyAdmin(credentials);

    const { id } = request.params;
    const result = await this.service.getSalesById(id);

    return h.response({
      status: "success",
      data: result,
    }).code(200);
  }

  async createSales(request, h) {
    const { credentials } = request.auth;
    onlyAdmin(credentials);

    this.validator.validateCreatePayload(request.payload);

    const id = await this.service.createSales(request.payload);

    return h.response({
      status: "success",
      message: "Akun sales berhasil dibuat",
      data: { id },
    }).code(201);
  }

  async updateSales(request, h) {
    const { credentials } = request.auth;
    onlyAdmin(credentials);

    this.validator.validateUpdatePayload(request.payload);

    const { id } = request.params;
    await this.service.updateSales(id, request.payload);

    return h.response({
      status: "success",
      message: "Data sales berhasil diperbarui",
    }).code(200);
  }

  async deleteSales(request, h) {
    const { credentials } = request.auth;
    onlyAdmin(credentials);

    const { id } = request.params;
    await this.service.deleteSales(id);

    return h.response({
      status: "success",
      message: "Akun sales berhasil dihapus",
    }).code(200);
  }
}

module.exports = SalesHandler;
