const Expense = require('../models/Expense');
const User = require('../models/User');
const Joi = require('joi');

const expenseSchema = Joi.object({
  amount: Joi.number().positive().required(),
  description: Joi.string().required(),
  splitMethod: Joi.string().valid('equal', 'exact', 'percentage').required(),
  participants: Joi.array().items(
    Joi.object({
      user: Joi.string().required(),
      amount: Joi.number().when('splitMethod', {
        is: 'exact',
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
      percentage: Joi.number().when('splitMethod', {
        is: 'percentage',
        then: Joi.required().min(0).max(100),
        otherwise: Joi.forbidden(),
      }),
    })
  ).min(1).required(),
});

exports.addExpense = async (req, res) => {
  try {
    const { error } = expenseSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { amount, description, splitMethod, participants } = req.body;

    if (splitMethod === 'percentage') {
      const totalPercentage = participants.reduce((sum, p) => sum + p.percentage, 0);
      if (Math.abs(totalPercentage - 100) > 0.01) {
        return res.status(400).json({ message: 'Percentages must add up to 100%' });
      }
    } else if (splitMethod === 'exact') {
      const totalAmount = participants.reduce((sum, p) => sum + p.amount, 0);
      if (Math.abs(totalAmount - amount) > 0.01) {
        return res.status(400).json({ message: 'The sum of exact amounts must equal the total expense amount' });
      }
    }

    const expense = new Expense({
      paidBy: req.user.userId,
      amount,
      description,
      splitMethod,
      participants,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};

// ... (rest of the file remains the same)