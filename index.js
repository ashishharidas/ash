// Initialize entries from localStorage or empty array
let entries = JSON.parse(localStorage.getItem('formEntries')) || [];

// Create and update table
function updateTable() {
    const tableContainer = document.getElementById('tableContainer');
    
    // Create table if it doesn't exist
    let table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>DOB</th>
                <th>Accepted terms?</th>
            </tr>
        </thead>
        <tbody>
            ${entries.map(entry => `
                <tr>
                    <td>${entry.name}</td>
                    <td>${entry.email}</td>
                    <td>${entry.password}</td>
                    <td>${entry.dob}</td>
                    <td>${entry.acceptTerms ? 'true' : 'false'}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    
    tableContainer.innerHTML = '';
    tableContainer.appendChild(table);
}

// Form submission handler
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        dob: document.getElementById('dob').value,
        acceptTerms: document.getElementById('acceptTerms').checked
    };
    
    // Validate age
    const age = calculateAge(formData.dob);
    if (age < 18 || age > 55) {
        alert('Age must be between 18 and 55 years');
        return;
    }
    
    // Add entry to array
    entries.push(formData);
    
    // Save to localStorage
    localStorage.setItem('formEntries', JSON.stringify(entries));
    
    // Update table
    updateTable();
    
    // Reset form
    this.reset();
});

// Calculate age function
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Initial table render
updateTable();
