const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    percentage: Number,
  }],
});

module.exports = mongoose.model('Expense', expenseSchema);