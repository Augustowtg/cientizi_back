const mongoose = require('mongoose');
const Project = mongoose.model('Project')

const projectRegister = (req, res, next) => {
    const { name, description, creator } = req.body
    const project = new Project();
    project = {
        name,
        description,
        creator
    }
    project.save((err, projeto) => {})
    .then((doc) => {
        return res.status(200).json({ "Status": true, Mensager: `Projeto cadastrado com sucesso ${projeto}` })
    }).catch((err) => {
        return res.status(400).json({ "Status": false, Error: "Projeto não cadastrado" })
    })
}

module.exports = {
    projectRegister
}