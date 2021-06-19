const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

// Create user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: 'Nome é obrigatorio'
    },
    email: {
        type: String,
        require: "Email é obrigatorio",
        unique: true
    },
    password: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
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

mongoose.model('User', userSchema);