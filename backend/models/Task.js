const mongoose = require('mongoose');

//define schema
const taskSchema = new mongoose.Schema({
    content: {type: String, required: true},
    done: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
    deadline: {type: Date},
});

module.exports = mongoose.model('Task', taskSchema);