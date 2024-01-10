var datetimeElement = document.getElementById("datetime");
            var now = new Date();
            datetimeElement.textContent = now.toLocaleString();

function calculateBudget() {
    // Validation
    let isValid = true;
    const fields = ['income', 'expenses', 'savings'];
    
    fields.forEach(field => {
        const value = document.getElementById(field).value;
        if (!value || isNaN(value)||value<0) {
            displayError(field, 'Please enter a valid number.');
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    const expenseTypes = document.getElementsByName('expenseType');
    const selectedExpenseTypes = Array.from(expenseTypes).some(type => type.checked);
    if (!selectedExpenseTypes) {
        displayError('expenseType', 'Please select at least one expense type.');
        isValid = false;
    } else {
        clearError('expenseType');
    }

    // Perform calculations and display report
    if (isValid) {
        const income = parseFloat(document.getElementById('income').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        const savings = parseFloat(document.getElementById('savings').value);

        const report = `income: $${income}\nExpenses: $${expenses}\nSavings: $${savings}\n`;

        const selectedExpenseTypesArray = Array.from(expenseTypes)
         .filter(type => type.checked)
         .map(type => type.value);

        const expenseTypesReport = `Expense Types: ${selectedExpenseTypesArray.join(', ')}\n`;

        const totalsavings = savings * 12; //  calculation
        const budgetSummary = `Total savings: $${totalsavings}\nRemaining Budget: $$`;

        document.getElementById('report').value =` ${report}${expenseTypesReport}${budgetSummary}`;
    }
}

function displayError(field, message) {
    const errorDiv = document.getElementById(`${field}Error`);
    if (errorDiv) {
        errorDiv.innerText = message;
    } else {
        const fieldElement = document.getElementById(field);
        const errorElement = document.createElement('div');
        errorElement.classList.add('text-danger');
        errorElement.id = `${field}Error`;
        errorElement.innerText = message;
        fieldElement.parentNode.insertBefore(errorElement, fieldElement.nextSibling);
    }
}

function clearError(field) {
    const errorDiv = document.getElementById(`${field}Error`);
    if (errorDiv) {
        errorDiv.remove();
    }
}