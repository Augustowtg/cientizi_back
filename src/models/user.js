const mongoose = require('mongoose');

// Create user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: True
    },
    password: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', userSchema);