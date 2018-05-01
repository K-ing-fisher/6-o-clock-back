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

const signIn = async function(request, h) {
  User.findOne({ id: request.payload.id })
    .then(result => {
      console.log(reslut);
      return h.response('User sign in success').code(201);
    })
    .catch(err => {
      console.log(err);
      return h.response('User sign in fail').code(400);
    })
}

module.exports = [
  {
    method: 'POST',
    path: '/signup',
    handler: signUp
  },
  {
    method: 'POST',
    path: '/signin',
    handler: signIn
  }
]