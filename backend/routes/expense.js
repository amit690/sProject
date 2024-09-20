const express = require('express');
const expenseController = require('../controlers/exppense');
const router = express.Router();

// POST request to add an expense
router.post('/expense', expenseController.postexpense);

// GET request to get all expenses
router.get('/expense', expenseController.getexpense);

// PUT request to update an expense by ID
router.put('/expense/:expenseid', expenseController.putexpense);

// DELETE request to delete an expense by ID
router.delete('/expense/:expenseid', expenseController.deleteexpense);

module.exports = router;
