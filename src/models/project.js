const mongoose = require('mongoose');

// Create project
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true
    },
    creator: {
        type: String,
        requrie: true,
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('Project', projectSchema);