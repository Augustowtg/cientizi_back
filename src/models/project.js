const mongoose = require('mongoose');
const User = mongoose.model('User');

// Create project
const projectSchema = new mongoose.Schema({
    icon: {
        type: String
    },
    name: {
        type: String,
        require: true,
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