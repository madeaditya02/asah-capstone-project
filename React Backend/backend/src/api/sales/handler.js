const { default: autoBind } = require("auto-bind");

class SalesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async getAllSales(h) {
    const result = await this.service.getAllSales();

    const response = h.response({
      status: "success",
      data: result,
    });
    return response;
  }

  async createSales(request, h) {
    this.validator.validateCreatePayload(request.payload);
    const result = await this.service.createSales(request.payload);

    const response = h.response({
      status: "success",
      message: "Sales berhasil dibuat",
      data: result,
    });
    response.code(201);
    return response;
  }

  async updateSales(request, h) {
    this.validator.validateUpdatePayload(request.payload);
    const { id } = request.params;

    const result = await this.service.updateSales(id, request.payload);

    const response = h.response({
      status: "success",
      message: "Data sales berhasil diperbarui",
      data: result,
    });
    return response;
  }

  async deleteSales(request, h) {
    const { id } = request.params;
    const result = await this.service.deleteSales(id);

    const response = h.response({
      status: "success",
      message: "Data sales berhasil dihapus",
      data: result,
    });
    return response;
  }
}

module.exports = SalesHandler;