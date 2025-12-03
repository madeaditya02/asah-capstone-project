const routes = (handler) => [
  {
    method: "POST",
    path: "/catatan",
    handler: handler.postCatatanHandler,
  },
  {
    method: "PUT",
    path: "/catatan/{id}",
    handler: handler.putCatatanByIdHandler,
  },
  {
    method: "GET",
    path: "/catatan",
    handler: handler.getAllCatatanHandler,
  },
  {
    method: "GET",
    path: "/catatan/{id}",
    handler: handler.getCatatanByIdHandler,
  },
  {
    method: "DELETE",
    path: "/catatan/{id}",
    handler: handler.deleteCatatanByIdHandler,
  },
];

module.exports = routes;
