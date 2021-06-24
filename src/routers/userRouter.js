const express = require('express');
const router = express.Router();

// Middlewares
const JWT = require('../middleware/jwt');

// Controllers 
const authController = require('../controller/authController');
const userController = require('../controller/userController');

// Rotas do usuario
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get("/user/profile", JWT.verifyJwtToken, userController.userProfile);

module.exports = app => app.use("/", router);