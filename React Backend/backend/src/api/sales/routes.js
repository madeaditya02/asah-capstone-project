const routes = (handler) => [
  {
    method: 'GET',
    path: '/sales',
    handler: handler.getAllSales,
    options: { auth: "jwt_strategy" },
  },

  {
    method: 'GET',
    path: '/sales/{id}',
    handler: handler.getSalesById,
    options: { auth: "jwt_strategy" },
  },

  {
    method: 'POST',
    path: '/sales',
    handler: handler.createSales,
    options: { auth: "jwt_strategy" },
  },

  {
    method: 'PUT',
    path: '/sales/{id}',
    handler: handler.updateSales,
    options: { auth: "jwt_strategy" },
  },

  {
    method: 'DELETE',
    path: '/sales/{id}',
    handler: handler.deleteSales,
    options: { auth: "jwt_strategy" },
  },
];

module.exports = routes;
