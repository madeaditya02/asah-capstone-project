const routes = (handler) => [
  {
    method: 'GET',
    path: '/sales',
    handler: handler.getAllSales,
  },
  {
    method: 'POST',
    path: '/sales',
    handler: handler.createSales,
  },
  {
    method: 'PUT',
    path: '/sales/{id}',
    handler: handler.updateSales,
  },
  {
    method: 'DELETE',
    path: '/sales/{id}',
    handler: handler.deleteSales,
  },
];

module.exports = routes;
