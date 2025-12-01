
const SalesHandler = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/sales',
    handler: SalesHandler.getAllSales,
  },
  {
    method: 'POST',
    path: '/sales',
    handler: SalesHandler.createSales,
  },
  {
    method: 'PUT',
    path: '/sales/{id}',
    handler: SalesHandler.updateSales,
  },
  {
    method: 'DELETE',
    path: '/sales/{id}',
    handler: SalesHandler.deleteSales,
  },
];
