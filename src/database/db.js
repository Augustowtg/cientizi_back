const mongoose = require('mongoose');

// Connect database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
    console.log('==> Database connected');
}).catch((err) => {
    console.log('Error in MongoDB connection : ' + err);
});

require('../models/user');
require('../models/project');