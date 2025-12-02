const autoBind = require('auto-bind').default; // Atau require('auto-bind')

class NasabahHandler {
  constructor(service) {
    this._service = service;
    autoBind(this);
  }

  // Handler untuk melihat daftar semua nasabah
   async getNasabahHandler(request, h) {
    // Tangkap 3 parameter ini dari URL
    const { prioritas, status, search } = request.query;

    // Kirim ke service sebagai satu object
    const nasabah = await this._service.getNasabah({ prioritas, status, search });
    
    return {
      status: 'success',
      data: {
        nasabah,
      },
    };
  }

  // Handler untuk melihat detail satu nasabah
  async getNasabahByIdHandler(request, h) {
    const { id } = request.params;
    const nasabah = await this._service.getNasabahById(id);

    return {
      status: 'success',
      data: {
        nasabah,
      },
    };
  }
}

module.exports = NasabahHandler;