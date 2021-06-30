const express = require('express');
const router = express.Router();
// Middlewares
const JWT = require('../middleware/jwt');

// Controllers 
const projectController = require("../controller/projectController");
const userController = require('../controller/userController');
const uploadController = require('../controller/uploadController');
// Rotas do projeto
router.post("/project/register", JWT.verifyJwtToken, userController.profile, 
uploadController.uploadImagen , projectController.projectRegister);

router.get("/project/list", projectController.projectlist);
router.post('project/consult', projectController.projectConsult);
router.post('/project/project', projectController.projectIndividual);


module.exports = app => app.use("/", router);