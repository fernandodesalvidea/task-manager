const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    content: {type: String, required: true},
    done: {type: Boolean, default: false},
    date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('Task', taskSchema);