const { default: autoBind } = require("auto-bind");

class CatatanHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async postCatatanHandler(request, h) {
    this.validator.validatePostCatatanPayload(request.payload);
    const { deskripsi, waktuDihubungi, durasi, statusId } = request.payload;

    const catatanId = await this.service.addCatatan({
      deskripsi,
      waktuDihubungi,
      durasi,
      statusId,
    });

    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        catatanId,
      },
    });
    response.code(201);
    return response;
  }

  async putCatatanByIdHandler(request) {
    const { id } = request.params;

    this.validator.validateUpdateCatatanPayload(request.payload);
    await this.service.updateCatatanById(id, request.payload);

    return {
      status: "success",
      message: "Catatan berhasil diperbarui",
    };
  }

  async getCatatanByIdHandler(request) {
    const { id } = request.params;
    const catatan = await this.service.getCatatanById(id);
    return {
      status: "success",
      data: {
        catatan,
      },
    };
  }

  async getAllCatatanHandler() {
    const catatan = await this.service.getAllCatatan();

    return {
      status: "success",
      data: {
        catatan,
      },
    };
  }

  async deleteCatatanByIdHandler(request) {
    const { id } = request.params;
    await this.service.deleteCatatanById(id);

    return {
      status: "success",
      message: "Catatan berhasil dihapus",
    };
  }
}

module.exports = CatatanHandler;
