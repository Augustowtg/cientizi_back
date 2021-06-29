const { request } = require('express');
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const userRouter = require('../routers/userRouter')

const projectRegister = async (req, res, next) => {
    const project = new Project();
    project.name = req.body.name;
    project.objective = req.body.objective;
    project.description = req.body.description;
    project.users = req.user;
    await project.save((err, doc) => {
        if (!err)
            return res.status(200).json({ Status: 200, message: "Projeto cadastrado"});
        else {
            if (err.code == 11000)
                return res.status(422).json({ Status: false, err: 'Nome ja cadastrado' });
            else
                return res.status(400).json({ Status: 400, message: err.message});
        }
    })
};

// Enviar o perfil do usuario
const projectlist = async (req, res, next) => {
    const projects = await Project
        .find()
        .select('users name -_id');
    return res.status(200).json({ Status: 200, message: projects });
}

// 

module.exports = {
    projectRegister,
    projectlist
}