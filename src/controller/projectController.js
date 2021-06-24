const mongoose = require('mongoose');
const Project = mongoose.model('Project');

const projectRegister = async (req, res, next) => {
    const project = new Project();
    project.name = req.body.name;
    project.description = req.body.description;
    project.creator = req._id;
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
const userProfile = async (req, res, next) => {
    await User.findOne({ _id: req._id }, ["-_id", "-password", "-__v"],
        (err, user) => {
            if (!user)
                return res.status(404).json({ Status: false, message: 'Usuario não foi achado' });
            else
                _.pick(user, ['name', 'email'])
            return res.status(200).json({ Status: true, user });
        }
    );
};

module.exports = {
    projectRegister
}