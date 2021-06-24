const express = require('express');
const router = express.Router();

// Middlewares
const JWT = require('../middleware/jwt');

// Controllers 
const projectController = require("../controller/projectController");

// Rotas do projeto
router.post("/project/register", JWT.verifyJwtToken, projectController.projectRegister);

module.exports = app => app.use("/", router);