'use strict'

const User = require('../../models/user');

const signUp = async function(request, h) {
  let user = new User();
  
  user.id = request.payload.id;
  user.pw = request.payload.pw;
  user.name = request.payload.name;

  try {
    const savedUser = await user.save();
    return h.response('User sign up success').code(201);
  } catch(e) {
    return h.response('User sign up fail').code(400);
  }
}

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: signUp
  }
]