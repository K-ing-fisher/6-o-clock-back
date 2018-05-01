const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let user = new Schema({
  id: { type: String, required: true },
  pw: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('user', user);