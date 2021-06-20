const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Criação da coleção 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Nome é obrigatorio'
    },
    email: {
        type: String,
        required: 'Email é obrigatorio',
        unique: true
    },
    password: {
        type: String,
        required: 'Senha é obrigatorio'
    },
    createAt: {
        type: Date,
        default: Date.now,
        select: false
    },
    saltSecret: {
        type: String,
        select: false
    }
});

// Validação de email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

// Eventos
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});


// Metodos
userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Gerar o tokin baseado no id
userSchema.methods.generateJwt = function () {
    return jwt.sign({ _id: this._id},
        process.env.JWT_SECRET,
    {
        expiresIn: process.env.JWT_EXP
    });
}

mongoose.model('User', userSchema);