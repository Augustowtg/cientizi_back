const express = require('express');
const { model } = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const login = express.Router();



module.exports = app => app.use('/login', login);