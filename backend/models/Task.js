const mongoose = require('mongoose');

//define schema
const taskSchema = new mongoose.Schema({
    content: {type: String, required: true},
    done: {type: Boolean, default: false},
    date: {type: Date, default: Date.now()},
    priority: {type: String, default: "Low"},
    deadline: {type: Date},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);