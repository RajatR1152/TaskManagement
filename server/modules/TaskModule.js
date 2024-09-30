const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    dueDate: Date,
    asignedUser: String,
    priority: String,
    status: String
})

const tasks = new mongoose.model('tasks',taskSchema);

module.exports = tasks;