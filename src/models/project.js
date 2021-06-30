const mongoose = require('mongoose');
const User = mongoose.model('User');

// Create project
const projectSchema = new mongoose.Schema({
    icon: {
        type: String
    },
    banner: {
        type: String,
        default: 'https://projetaiexample.s3.amazonaws.com/73c0fecc156a8fa0b1a7474d90e4c7b8-banner.png'
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
    users: [
    ],
    objective: {
        type: String,
    },

    description: {
        type: String,
        require: true
    },
    createAt: {
    type: Date,
    default: Date.now
}
})

mongoose.model('Project', projectSchema);