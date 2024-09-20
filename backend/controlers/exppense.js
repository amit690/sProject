const expenseData = require('../models/exppense');

// POST request: Add a new expense
exports.postexpense = async (req, res, next) => {
    const { amount, description, category } = req.body;

    try {
        const result = await expenseData.create({
            amount: amount,
            description: description,
            category: category,
        });
        res.status(201).json({ message: 'Expense added', expense: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error });
    }
};

// GET request: Fetch all expenses
exports.getexpense = async (req, res, next) => {
    try {
        const result = await expenseData.findAll();
        res.status(200).json({ message: 'All expenses', expenses: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error });
    }
};

// PUT request: Edit an expense by ID
exports.putexpense = async (req, res, next) => {
    const id = req.params.expenseid;
    const { amount, description, category } = req.body;

    try {
        const expense = await expenseData.findByPk(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        expense.amount = amount;
        expense.description = description;
        expense.category = category;

        const updatedExpense = await expense.save();
        res.status(200).json({ message: 'Expense updated successfully', expense: updatedExpense });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error });
    }
};

// DELETE request: Delete an expense by ID
exports.deleteexpense = async (req, res, next) => {
    const id = req.params.expenseid;

    try {
        const expense = await expenseData.findByPk(id);

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        await expense.destroy();
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error });
    }
};
