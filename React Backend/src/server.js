require("dotenv").config();

const Hapi = require("@hapi/hapi");
const CatatanService = require("./services/CatatanService");
const catatan = require("./api/catatan");
const CatatanValidator = require("./validator/catatan");
const ClientError = require("./exceptions/ClientError");
const StatusService = require("./services/StatusService");
const status = require("./api/status");

const init = async () => {
  const catatanService = new CatatanService();
  const statusService = new StatusService();

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register([
    {
      plugin: catatan,
      options: {
        service: catatanService,
        validator: CatatanValidator,
      },
    },
    {
      plugin: status,
      options: {
        service: statusService,
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: "error",
        message: `Terjadi kegagalan pada server kami: ${response.message}`,
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
