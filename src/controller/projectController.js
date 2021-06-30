const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const _ = require('lodash');

const projectRegister = async (req, res, next) => {
    const project = new Project();
    project.icon = req.uplaod_url;
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
        .select('users name objective icon description _id');
    return res.status(200).json({ Status: 200, message: projects });
}

// consultas
const projectConsult = async (req, res, next) => {
    console.log(req.body.info);
    const projects = await Project
    .find({ 'description': req.body.info });
    console.log(projects)
    return res.status(200).json({ Status: 200, message: projects })
}

// Projeto indivual

// Enviar o perfil do projeto
const projectIndividual = async (req, res, next) => {
    console.log(req.body.project);
    await Project.findOne({ _id: req.body.project },
        (err, project) => {
            if (!project)
                return res.status(404).json({ Status: false, message: 'Projeto não foi achado' });
            else {
                _.pick(project)
                req.project = project
                return res.status(200).json({ Status: 200, message: project})
            }
                
        }
    );
};


module.exports = {
    projectRegister,
    projectlist,
    projectConsult,
    projectIndividual
}