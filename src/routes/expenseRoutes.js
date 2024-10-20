const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();

router.post('/', expenseController.addExpense);
router.get('/user', expenseController.getUserExpenses);
router.get('/all', expenseController.getAllExpenses);
router.get('/balance-sheet', expenseController.downloadBalanceSheet);

module.exports = router;