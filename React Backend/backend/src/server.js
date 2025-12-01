require("dotenv").config();
const Hapi = require("@hapi/hapi");
const ClientError = require("./exceptions/ClientError");

const auth = require("./api/auth");
const AuthService = require("./services/AuthService");
const AuthValidator = require("./validator/auth");

const sales = require("./api/sales");
const SalesService = require("./services/SalesService");
const SalesValidator = require("./validator/sales");

const CatatanService = require("./services/CatatanService");
const catatan = require("./api/catatan");
const CatatanValidator = require("./validator/catatan");

const StatusService = require("./services/StatusService");
const status = require("./api/status");

const init = async () => {
  const authService = new AuthService();
  const salesService = new SalesService();
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
      plugin: auth,
      options: {
        service: authService,
        validator: AuthValidator,
      },
    },
    {
      plugin: sales,
      options: {
        service: salesService,
        validator: SalesValidator,
      },
    },
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
  console.log(`Server running at: ${server.info.uri}`);
};

init();
