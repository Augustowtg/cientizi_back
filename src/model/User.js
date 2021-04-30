const mongoose = require('../database/database');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'User'
});


const user = mongoose.model('User', User);

module.exports = user;