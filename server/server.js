'use strict'

const Hapi        = require('hapi');
const route       = require('./routes');
const mongoose    = require('mongoose');
const corsHeaders = require('hapi-cors-headers');

const port = process.env.PORT || 5429;
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
  console.log('Connected mongodb server');
})

mongoose.connect('mongodb://localhost/6_o_clock');

const server = Hapi.server({
  port: port,
  host: 'localhost',
  routes: { cors: true }
});
server.ext('onPreResponse', corsHeaders);
server.route(route);

const init = async () => {
  await server.start();

  console.log(`Server running at ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();