const express = require('express');
const router = express.Router();
// Middlewares
const JWT = require('../middleware/jwt');

// Controllers 
const projectController = require("../controller/projectController");
const userController = require('../controller/userController');

// Rotas do projeto
router.post("/project/register", JWT.verifyJwtToken, userController.profile, projectController.projectRegister);
router.get("/project/list", projectController.projectlist,);


module.exports = app => app.use("/", router);