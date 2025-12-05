require("dotenv").config();

const Hapi = require("@hapi/hapi");
const Jwt = require("@hapi/jwt");
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

const NasabahService = require("./services/NasabahService");
const nasabah = require("./api/nasabah");

const ProfileService = require("./services/ProfileService");
const profilePlugin = require("./api/profile");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || "localhost",
    routes: {
      cors: { origin: ["*"] },
    },
  });

  // Registrasi Plugin JWT
  await server.register(Jwt);

  // --- BAGIAN INI YANG DIPERBAIKI ---
  server.auth.strategy("jwt_strategy", "jwt", {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: parseInt(process.env.ACCESS_TOKEN_AGE),
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: artifacts.decoded.payload,
    }),
  });
 

  server.auth.default("jwt_strategy");

  const authService = new AuthService();
  const salesService = new SalesService();
  const catatanService = new CatatanService();
  const statusService = new StatusService();
  const nasabahService = new NasabahService(); 
  const profileService = new ProfileService();
 
  await server.register([
    {
      plugin: auth,
      options: { service: authService, validator: AuthValidator },
    },
    {
      plugin: sales,
      options: { service: salesService, validator: SalesValidator },
    },
    {
      plugin: catatan,
      options: { service: catatanService, validator: CatatanValidator },
    },
    {
      plugin: status,
      options: { service: statusService },
    },
    {
      plugin: profilePlugin,
      options: { service: profileService },
    },
    {
      plugin: nasabah,
      options: {
        service: nasabahService,
        // Validator tidak dimasukkan karena fitur Nasabah saat ini hanya GET (Read Only)
      },
    },
  ]);

  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        return h
          .response({
            status: "fail",
            message: response.message,
          })
          .code(response.statusCode);
      }

      if (!response.isServer) {
        return h.continue;
      }
      console.log("---------------- DETEKSI ERROR ----------------");
      console.error(response); // <--- INI AKAN MENAMPILKAN ERROR ASLINYA
      console.log("-----------------------------------------------");

      console.error("SERVER ERROR:", response);
      return h
        .response({
          status: "error",
          message: "Terjadi kegagalan pada server",
        })
        .code(500);
    }

    return h.continue;
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();