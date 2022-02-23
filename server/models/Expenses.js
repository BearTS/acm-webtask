const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    username: { type: String, required: true },
    text: { type: String, required: true },
    amount: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now}
});

module.exports = mongoose.model('expense', expenseSchema);