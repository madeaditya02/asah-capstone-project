const CatatanHandler = require("./handler");
const routes = require("./routes");

module.exports = {
    name: "catatan",
    version: "1.0.0",
    register: async (server, { service, validator }) => {
        const catatanHandler = new CatatanHandler(service, validator);
        server.route(routes(catatanHandler));
    },
}