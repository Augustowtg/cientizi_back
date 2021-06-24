const mongoose = require('mongoose');
const User = mongoose.model('User');

// Create project
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    Users: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
        }
    ],

    creator: {
    type: String,
    required: 'Creator é obrigatorio',
},
    createAt: {
    type: Date,
    default: Date.now
}
})

mongoose.model('Project', projectSchema);