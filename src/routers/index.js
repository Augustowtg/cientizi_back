const express = require('express');
const multer = require("multer");
const router = express.Router();

// Middlewares
const JWT = require('../middleware/jwt');

// Controllers 
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const projectController = require("../controller/projectController");

// Rotas do usuario
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get("/user/profile", JWT.verifyJwtToken, userController.userProfile);

// Rotas do projeto
router.post("/project/register", projectController.projectRegister);

module.exports = app => app.use("/", router);