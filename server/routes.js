'use strict'
const User = require('../models/user');

let handler = {};

handler.signUp = function(request, reply) {
  let user = new User();
  console.log(`payload ${request.payload}`);
  console.log('------------------------------------');
  let userData = JSON.parse(request.payload);
  user.id = userData.id;
  user.pw = userData.pw;
  user.name = userData.name;

  user.save(function(err) {
    if (err) {
      console.error(err);
      return 0;
    }

    return 1;
  });

  return "hello world";
}

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: handler.signUp
  }
]