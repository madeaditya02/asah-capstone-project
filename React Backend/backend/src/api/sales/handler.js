const { default: autoBind } = require("auto-bind");

class SalesHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async getAllSales() {
    return {
      status: "success",
      data: {
        catatan,
      },
    };
  }

  async createSales(request, h) {
    this.validator.validateCreatePayload(request.payload);
    const result = await this.service.createSales(request.payload);

    const response = h.response({
      status: "success",
      message: "Sales berhasil dibuat",
      data: {
        result,
      },
    });
    response.code(201);
    return response;
  }

  async updateSales(request) {
    this.validator.validateUpdatePayload(request.payload);

    const { id } = request.params;
    await this.service.updateSales(id, request.payload);

    return {
      status: "success",
      message: "Data sales berhasil diperbarui",
    };
  }

  async deleteSales(request) {
    const { id } = request.params;
    await this.service.deleteSales(id);

    return {
      status: "success",
      message: "Data sales berhasil dihapus",
    };
  }
}

module.exports = SalesHandler;
