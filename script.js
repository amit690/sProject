// Axios functions for making API calls
async function getExpense() {
    try {
        const allExpenses = await axios.get("http://localhost:4000/expense");
        return allExpenses.data.expenses;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function postExpense(expense) {
    try {
        const res = await axios.post("http://localhost:4000/expense", expense);
        return res.data.expense;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteExpense(id) {
    try {
        const res = await axios.delete(`http://localhost:4000/expense/${id}`);
        return res.data.message;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function putExpense(id, updatedExpense) {
    try {
        const res = await axios.put(`http://localhost:4000/expense/${id}`, updatedExpense);
        return res.data.editedExpense;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// DOM Elements and Variables
const form = document.getElementById('inputForm');
const tableBody = document.getElementById("expenseTableBody");
let editIndex = -1;
let editId = null; // Stores the ID of the expense to be edited

// Handling form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expense = { amount, description, category };

    if (editIndex === -1) {
        await postExpense(expense); // Create new expense
    } else {
        await putExpense(editId, expense); // Update existing expense
        editIndex = -1;
        editId = null;
    }

    form.reset();
    displayExpenses(); // Refresh the table
});

// Display Expenses in Table
async function displayExpenses() {
    const expenses = await getExpense();
    tableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>Rs. ${expense.amount}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-expense" data-id="${expense.id}" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete-expense" data-id="${expense.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-expense').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            await deleteExpense(id);
            displayExpenses(); // Refresh table after deletion
        });
    });

    // Add event listeners for edit buttons
    document.querySelectorAll('.edit-expense').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const index = e.target.getAttribute('data-index');
            editExpense(id, index);
        });
    });
}

// Edit Expense
async function editExpense(id, index) {
    const expenses = await getExpense();
    const expense = expenses[index];

    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;

    editIndex = index;
    editId = id;
}

// Load expenses when document is ready
document.addEventListener('DOMContentLoaded', displayExpenses);
