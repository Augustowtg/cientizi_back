const mongoose = require('mongoose');

// Connect database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('==> Database connected');
}).catch((err) => {
    console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2));
});

require('../models/user');
require('../models/project');