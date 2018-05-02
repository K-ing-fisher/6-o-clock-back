'use strict'

const User = require('../../models/user');

const signUp = async (request, h) => {
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

const signIn = async (request, h) => {
  try {
    let result = await User.findOne({ id: request.payload.id, pw: request.payload.pw });
    if (!result) return h.response('id or password is wrong.').code(401);

    let cookie = request.state.session;

    if (!cookie) {
      cookie = {
        username: 'geni',
        firstVisit: false
      }
    }

    cookie.lastVisit = Date.now();
    console.log(`I will send this cookie: ${cookie}`);
    
    return h.response('User sign in success').state('session', cookie);
  } catch(e) {
    console.log(e);
    return h.response('User sign in fail').code(500);
  }
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
    config: {
      state: {
        parse: true,
        failAction: 'error'
      },
      handler: signIn
    }
  }
]