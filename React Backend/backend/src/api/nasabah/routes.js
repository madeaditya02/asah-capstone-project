const routes = (handler) => [
  {
    method: 'GET',
    path: '/nasabah',
    handler: handler.getNasabahHandler,
  },
  {
    method: 'GET',
    path: '/nasabah/{id}',
    handler: handler.getNasabahByIdHandler,
  },
];

module.exports = routes;