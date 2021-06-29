const express = require('express');
const router = express.Router();
const multer = require("multer");
const mongoose = require('mongoose');
const multerConfig = require("../config/multer");

const Upload = mongoose.model('Upload');
router.post("/posts", multer(multerConfig).single("file"), async (req, res, next) => {
    if(req.file === undefined){
        next()
    }
    const { originalname: name, size, key, location: url = "" } = req.file;
  
    const upload = await Upload.create({
      name,
      size,
      key,
      url
    });
  
    return res.json(upload);
  });
  
module.exports = app => app.use("/", router);