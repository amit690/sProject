// Getting elements from the document and declaring a flag for the edit button
const form = document.getElementById('inputForm');
const tableBody = document.getElementById("expenseTableBody");
let editIndex = -1;

// Handling form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Getting the values from input items
    const amount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    // Creating expense object and adding/updating it in the local storage
    const expense = {
        amount: amount,
        description: description,
        category: category,
    }

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    if (editIndex === -1) {
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = -1; // Resetting the edit index
    }

    // Saving back to the local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    // Reset the form
    form.reset();

    // Update the table
    displayExpenses();
});

function displayExpenses() {
    // Getting values from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Clearing the table body
    tableBody.innerHTML = '';
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>Rs. ${expense.amount}</td>
            <td>${expense.description}</td>
            <td>${expense.category}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-expense" data-index="${index}">Edit</button>
                <button class="btn btn-danger btn-sm delete-expense" data-index="${index}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll('.delete-expense');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            deleteExpense(index);
        });
    });

    // Add event listeners to edit buttons
    const editButtons = document.querySelectorAll('.edit-expense');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            editExpense(index, e.target);
        });
    });
}

function deleteExpense(index) {
    // Accessing the local storage values
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Deleting the specific row
    expenses.splice(index, 1);
    // Saving back to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    // Display the new table
    displayExpenses();
}

function editExpense(index, editButton) {
    // Accessing the local storage values
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Getting the expense to be edited
    const expense = expenses[index];
    // Filling the input fields
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('description').value = expense.description;
    document.getElementById('category').value = expense.category;
    // Setting the edit index
    editIndex = index;
    // Change the edit button color to red
    editButton.classList.add('btn-danger');
    // Highlight the table row
    document.querySelectorAll('tr').forEach(row => row.classList.remove('table-warning'));
    editButton.closest('tr').classList.add('table-warning');
}

// Load existing expenses when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    displayExpenses();
});
