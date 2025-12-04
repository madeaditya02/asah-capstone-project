const routes = (handler) => [
  {
    method: "POST",
    path: "nasabah/{nasabahId}/catatan",
    handler: handler.postCatatanHandler,
  },
  {
    method: "PUT",
    path: "nasabah/{nasabahId}/catatan/{catatanId}",
    handler: handler.putCatatanByIdHandler,
  },
  {
    method: "GET",
    path: "nasabah/{nasabahId}/catatan",
    handler: handler.getAllCatatanHandler,
  },
  {
    method: "GET",
    path: "nasabah/{nasabahId}/catatan/{catatanId}",
    handler: handler.getCatatanByIdHandler,
  },
  {
    method: "DELETE",
    path: "nasabah/{nasabahId}/catatan/{catatanId}",
    handler: handler.deleteCatatanByIdHandler,
  },
];

module.exports = routes;
