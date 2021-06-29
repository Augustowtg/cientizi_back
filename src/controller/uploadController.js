const express = require('express');
const mongoose = require('mongoose');

const Upload = mongoose.model('Upload');
const uploadImagen = async (req, res, next) => {
    if (req.file === undefined) {
        req.uplaod_url = process.env.UPLOAD_URL;
        next()
    }
    const { originalname: name, size, key, location: url = "" } = req.file;

    const upload = await Upload.create({
        name,
        size,
        key,
        url
    });
    req.uplaod_url = upload.url;
    next()
};

module.exports = {
    uploadImagen
}

// const multer = require("multer");
// const multerConfig = require("../config/multer");
// router.post("/posts", multer(multerConfig).single("file"),