// DOM Elements
const baseNumberInput = document.getElementById('baseNumber');
const addRowBtn = document.getElementById('addRowBtn');
const tableBody = document.getElementById('tableBody');
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
    addRowBtn.addEventListener('click', addTableRow);
    addNameBtn.addEventListener('click', addName);
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addName();
    });
    
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
    
    tableBody.appendChild(row);
    
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
    const baseNumber = parseFloat(baseNumberInput.value) || 0;
    
    // Get table data
    const rows = tableBody.querySelectorAll('tr');
    tableData = [];
    rows.forEach(row => {
        const description = row.querySelector('.description-input').value;
        const value = parseFloat(row.querySelector('.value-input').value) || 0;
        if (description && value) {
            tableData.push({ description, value });
        }
    });
    
    // Calculate result
    let result = baseNumber;
    
    // Add all table values
    tableData.forEach(item => {
        result += item.value;
    });
    
    // Multiply by number of names (if any)
    if (names.length > 0) {
        result *= names.length;
    }
    
    // Display result
    if (baseNumber === 0 && tableData.length === 0 && names.length === 0) {
        resultText.textContent = 'Enter data to see the result';
    } else {
        resultText.textContent = `Result: ${result.toFixed(2)}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init); 