const StatusHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: "status",
    version: "1.0.0",
    register: async (server, { service }) => {
        const statusHandler = new StatusHandler(service);
        server.route(routes(statusHandler));
    },
}