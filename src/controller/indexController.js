const mongoose = require('mongoose');
const Project = mongoose.model("Project");

const projectsfind = async (req, res, next) => {
    await Project.find(
        ['-_id', 'name', 'description', 'creator'],
        (err, projects) => {
            _.pick(projects)
        }
    ).then((projects) => {
        return res.status(200).json({ Status: true, Projetos:projects });
    }).catch((err) => {
        return res.status(400).json({ Status: false, Erro: "Projetos não encontrados" });
    })
};

module.exports = {
    projectsfind
}