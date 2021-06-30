const express = require('express');
const router = express.Router();
const multer = require("multer");
const multerConfig = require("../config/multer");

const uploadController = require("../controller/uploadController");

// Middlewares
const JWT = require('../middleware/jwt');

// Controllers 
const authController = require('../controller/authController');
const userController = require('../controller/userController');

const mongoose = require('mongoose');

const Upload = mongoose.model('Upload');

// Rotas do usuario
router.post("/user/register", authController.register);
router.post("/user/login", authController.login);
router.get("/user/profile", JWT.verifyJwtToken, userController.userProfile);

router.post("/test/envio", multer(multerConfig).single("file"), async (req, res) => {
    const { originalname: name, size, key, location: url = "" } = req.file;
  
    const post = await Upload.create({
      name,
      size,
      key,
      url
    });
  
    return res.json(post);
  });
  
module.exports = app => app.use("/", router);