const express = require('express');
const app = express();

var path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cors());

const passport = require('passport');

require('./controller/login')(app)
require('./controller/authController')(app)

app.get('/', function (req, res) {
  res.send("Hello World!");
});
const porta = process.env.PORT || 3000;

app.listen(porta, () =>{
  console.log('Listening on port 3000!');
});