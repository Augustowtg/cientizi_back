const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('User');

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
    userProfile,
}