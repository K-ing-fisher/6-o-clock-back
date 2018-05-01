'use strict'

const Hapi     = require('hapi');
const mongoose = require('mongoose');
const path     = require('path');

const port = process.env.PORT || 5429;
const server = Hapi.Server({
  port: process.env.PORT || 5429,
  host: 'localhost'
});

const user = require('./User/routes');

//data base
const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => {
  console.log('Connected mongodb server');
})

mongoose.connect('mongodb://localhost/6_o_clock');

const start = async () => {
  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, h) {
      return h.file(path.resolve(__dirname, '..', 'public/index.html'));
    }
  })

  server.route(user);

  await server.start();
  console.log(`Server running at ${server.info.uri}`);
}

start();