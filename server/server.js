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

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, h) {
    return h.file(path.resolve(__dirname, '..', 'public/index.html'));
  }
});

server.route({
  method: 'GET',
  path: '/session',
  handler: function(request, h) {
    console.log('session check');
    const cookie = request.state.session;
    console.log(`I got this cookie: ${cookie}`);
    
    if (!cookie) return h.response('none exist session').code(400);
    return h.response('exist session').code(200);
  }
});

server.route(user);

const start = async () => {
  await server.register(require('inert'));
  await server.state('session', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
  });
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
}

start();