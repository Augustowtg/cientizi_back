const mongoose = require('mongoose');
const User = mongoose.model('User');

// Create project
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    users: [
    ],
    createAt: {
    type: Date,
    default: Date.now
}
})

mongoose.model('Project', projectSchema);