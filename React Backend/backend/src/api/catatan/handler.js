const { default: autoBind } = require("auto-bind");

class CatatanHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;

    autoBind(this);
  }

  async postCatatanHandler(request, h) {
    const { nasabahId } = request.params;
    const { id_user: userId } = request.auth.credentials;

    this.validator.validatePostCatatanPayload(request.payload, nasabahId, userId);

    const { deskripsi, waktuDihubungi, durasi, statusId } = request.payload;

    const catatanId = await this.service.addCatatan({
      deskripsi,
      waktuDihubungi,
      durasi,
      nasabahId,
      userId,
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
    const { catatanId } = request.params;
    const { id_user: userId } = request.auth.credentials;

    this.validator.validateUpdateCatatanPayload(request.payload);
    await this.service.updateCatatanById(catatanId, userId, request.payload);

    return {
      status: "success",
      message: "Catatan berhasil diperbarui",
    };
  }

  async getCatatanByIdHandler(request) {
    const { catatanId } = request.params;
    const catatan = await this.service.getCatatanById(catatanId);
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
    const { catatanId } = request.params;
    await this.service.deleteCatatanById(catatanId, userId);

    return {
      status: "success",
      message: "Catatan berhasil dihapus",
    };
  }
}

module.exports = CatatanHandler;
