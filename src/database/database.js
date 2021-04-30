const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mean', { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) });
mongoose.Promise = global.Promise;

module.exports = mongoose;