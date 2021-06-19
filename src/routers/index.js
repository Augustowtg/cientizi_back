const express = require('express');
const multer = require("multer");
const router = express.Router();

// Middlewares
const jwtHelper = require('../middleware/jwt');

// Controllers 
const authController = require('../controller/authController');
const projectController = require("../controller/projectController");

// Rotas do usuario
router.post("/user/register", authController.register);
router.post("/user/login", authController.login)

// Rotas do projeto
router.post("/project/register", projectController.projectRegister);

module.exports = app => app.use("/", router);