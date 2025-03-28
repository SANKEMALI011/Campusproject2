function switchTab(event, userType) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form').forEach(form => form.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.getElementById(userType).classList.add('active');
}

// Handle login form submission
document.querySelectorAll('.form').forEach(form => {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Get the active form's ID to determine user type
        const userType = this.id;

        // Redirect to different pages based on user type
        if (userType === 'student') {
            window.location.href = '../Student/index.html';
        } else if (userType === 'company') {
            window.location.href = '../Company/company.html';
        } else if (userType === 'college') {
            window.location.href = '../College/index.html';
        }
    });
});


function submit(index) {
    alert("✅ You have successfully applied for the job!");
}