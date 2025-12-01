require('dotenv').config();
const Hapi = require('@hapi/hapi');

const authPlugin = require('./src/api/auth');
const salesPlugin = require('./src/api/sales');

const init = async () => {

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: { origin: ['*'] },
    },
  });

  await server.register([
    authPlugin,
    salesPlugin
  ]);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

init();
