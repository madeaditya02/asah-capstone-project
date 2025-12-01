const routes = (handler) => [
  {
    method: "GET",
    path: "/status",
    handler: handler.getAllStatusHandler,
  },
];

module.exports = routes;
