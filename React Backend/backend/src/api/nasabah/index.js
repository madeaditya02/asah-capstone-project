const NasabahHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'nasabah',
  version: '1.0.0',
  register: async (server, { service }) => {
    const handler = new NasabahHandler(service);
    server.route(routes(handler));
  },
};