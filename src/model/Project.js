const mongoose = require('../database/database');
const Schema = mongoose.Schema;

const Project = new Schema({
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
  collection: 'Project'
});


const roject = mongoose.model('Project', Project);

module.exports = project;