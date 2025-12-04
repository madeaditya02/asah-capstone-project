const ProfileHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "profile",
  version: "1.0.0",
  register: async (server, { service }) => {
    const handler = new ProfileHandler(service);
    server.route(routes(handler));
  },
};
