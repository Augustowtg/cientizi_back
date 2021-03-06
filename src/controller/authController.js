const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

// Registro de um usuario
const register = (req, res, next) => {
    const { name, email, password } = req.body; 
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    user.save((err, doc) => {
        if (!err)
            return res.send(doc);
        else {
            if (err.code == 11000)
                return res.status(422).json({ Status: false, err: 'Email ja cadastrado' });
            else
                return next(err);
        }
    });
};

// Login de um usuario
const login =  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return res.status(400).json(err);
        else if (user) return res.status(200).json({ "token": user.generateJwt() });
        else return res.status(404).json(info);
    })(req, res, next);
};

// Forget password
const forgetPassword = (req, res, next) => {
    
};

module.exports = {
    login,
    register,
}