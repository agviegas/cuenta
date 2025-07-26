// DOM Elements
const baseNumberInput = document.getElementById('baseNumber');
const payerNameInput = document.getElementById('payerName');
const singleExpensesAddRowBtn = document.getElementById('singleExpensesAddRowBtn');
const singleExpensesTableBody = document.getElementById('singleExpensesTableBody');
const nameInput = document.getElementById('nameInput');
const addNameBtn = document.getElementById('addNameBtn');
const namesList = document.getElementById('namesList');
const resultText = document.getElementById('resultText');

// Data storage
let tableData = [];
let names = [];

// Initialize the app
function init() {
    // Add event listeners
    baseNumberInput.addEventListener('input', updateResult);
    singleExpensesAddRowBtn.addEventListener('click', addTableRow);
    addNameBtn.addEventListener('click', addName);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addName();
    });
    payerNameInput.addEventListener('input', updateResult);
    
    // Add initial table row
    addTableRow();
    
    // Update result initially
    updateResult();
}

// Table functions
function addTableRow() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><input type="text" placeholder="Name" class="description-input"></td>
        <td><input type="number" placeholder="Payed amount" class="value-input"></td>
        <td><button class="btn btn-danger delete-row-btn">Delete</button></td>
    `;
    
    singleExpensesTableBody.appendChild(row);
    
    // Add event listeners to new inputs
    const descriptionInput = row.querySelector('.description-input');
    const valueInput = row.querySelector('.value-input');
    const deleteBtn = row.querySelector('.delete-row-btn');
    
    descriptionInput.addEventListener('input', updateResult);
    valueInput.addEventListener('input', updateResult);
    deleteBtn.addEventListener('click', () => {
        row.remove();
        updateResult();
    });
    
    updateResult();
}

// List functions
function addName() {
    const name = nameInput.value.trim();
    if (name) {
        names.push(name);
        displayNames();
        nameInput.value = '';
        updateResult();
    }
}

function removeName(index) {
    names.splice(index, 1);
    displayNames();
    updateResult();
}

function displayNames() {
    namesList.innerHTML = '';
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${name}</span>
            <button class="delete-btn" onclick="removeName(${index})">Delete</button>
        `;
        namesList.appendChild(li);
    });
}

// Result computation
function updateResult() {
   const totalAmount = parseFloat(baseNumberInput.value) || 0;
   const payerName = payerNameInput.value.trim();
   if(payerName.length === 0){
    return;
   }
   console.log(payerName, totalAmount);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 