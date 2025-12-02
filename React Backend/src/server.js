require("dotenv").config();

const Hapi = require("@hapi/hapi");
const CatatanService = require("./services/CatatanService");
const catatan = require("./api/catatan");
const CatatanValidator = require("./validator/catatan");
const ClientError = require("./exceptions/ClientError");
const StatusService = require("./services/StatusService");
const status = require("./api/status");
const NasabahService = require("./services/NasabahService");
const nasabah = require("./api/nasabah");

const init = async () => {
  const catatanService = new CatatanService();
  const statusService = new StatusService();
  const nasabahService = new NasabahService(); 

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



      console.log("---------------- DETEKSI ERROR ----------------");
      console.error(response); // <--- INI AKAN MENAMPILKAN ERROR ASLINYA
      console.log("-----------------------------------------------");



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
