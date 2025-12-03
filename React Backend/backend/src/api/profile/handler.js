const { default: autoBind } = require("auto-bind");
const { onlyAdmin, adminOrSelf } = require("../../utils/roleCheck");

class ProfileHandler {
  constructor(service) {
    this.service = service;
    autoBind(this);
  }

  async getProfileById(request, h) {
    const { id } = request.params;
    const { credentials } = request.auth;

    adminOrSelf(credentials, id);

    const result = await this.service.getProfileById(id);

    return h.response({
      status: "success",
      data: result,
    }).code(200);
  }

  async getAllProfiles(request, h) {
    const { credentials } = request.auth;

    
    onlyAdmin(credentials);

    const result = await this.service.getAllProfiles();

    return h.response({
      status: "success",
      data: result,
    }).code(200);
  }

  async updateProfile(request, h) {
    const { id } = request.params;
    const { credentials } = request.auth;

    adminOrSelf(credentials, id);

    const updated = await this.service.updateProfile(id, request.payload);

    return h.response({
      status: "success",
      message: "Profil berhasil diperbarui",
      data: updated,
    }).code(200);
  }

  async deleteProfile(request, h) {
    const { id } = request.params;
    const { credentials } = request.auth;

 
    onlyAdmin(credentials);

    const deleted = await this.service.deleteProfile(id);

    return h.response({
      status: "success",
      message: "Akun berhasil dihapus",
      data: deleted,
    }).code(200);
  }
}

module.exports = ProfileHandler;
