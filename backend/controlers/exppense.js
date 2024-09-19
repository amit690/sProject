const expenseData = require('../models/exppense'); 

// POST request to add a new expense
exports.postexpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    try {
        const result = await expenseData.create({
            amount: amount,
            description: description,
            category: category
        });
        console.log('Expense added');
        res.status(201).json({ message: 'Expense added', expense: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error });
    }
}

// GET request to fetch all expenses
exports.getexpense = async (req, res, next) => {
    try {
        const result = await expenseData.findAll();
        res.status(200).json({ message: 'All expenses fetched', expenses: result });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'An error occurred', error: error });
    }
}

// PUT request to edit an existing expense
exports.putexpense = async (req, res, next) => {
    try {
        const id = req.params.expenseid; 
        const result = await expenseData.findByPk(id);

        // Check if expense exists
        if (!result) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Update the existing data
        result.amount = req.body.amount;
        result.description = req.body.description;
        result.category = req.body.category;

        // Save the updated data
        const editedexpense = await result.save();

        // Send response
        res.json({ message: 'Expense edited successfully', expense: editedexpense });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error', error: error });
    }
}

// DELETE request to remove an expense
exports.deleteexpense = async (req, res, next) => {
    try {
        const id = req.params.expenseid; 
        const result = await expenseData.findByPk(id);

        // Check if expense exists
        if (!result) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Delete the expense
        await result.destroy();

        // Send response
        res.json({ message: 'Expense deleted successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error', error: error });
    }
}
