document.addEventListener("DOMContentLoaded", function () {
    console.log("Web page loaded successfully!");
});
document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");

    // Handle form submission
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault(); 

        let students = JSON.parse(localStorage.getItem("students2")) || [];

        // Capture form data
        const studentData = {
            name: document.getElementById("student-name").value.trim(),
            phone: document.getElementById("phone-number").value.trim(),
            email: document.getElementById("email").value.trim(),
            degree: document.getElementById("degree").value.trim(),
            college: document.getElementById("college-name").value.trim(),
            cgpa: document.getElementById("cgpa").value.trim(),
            resume: document.getElementById("resume").files[0] ? document.getElementById("resume").files[0].name : "Not Uploaded"
        };

        // Save to localStorage
        students.push(studentData);
        localStorage.setItem("students2", JSON.stringify(students));

        alert("Student Data Uploaded Successfully!");
        studentForm.reset();
        displayStudents();
    });

    // Handle CSV File Upload
    document.getElementById("file-upload").addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const csvData = e.target.result;
                processCSVData(csvData);
            };
            reader.readAsText(file);
        }
    });

    // Process CSV Data
    function processCSVData(csvData) {
        let students = JSON.parse(localStorage.getItem("students2")) || [];
        const rows = csvData.split("\n").slice(1); // Skip the header row

        rows.forEach(row => {
            const columns = row.split(",");
            if (columns.length >= 7) {
                const studentData = {
                    name: columns[0].trim(),
                    phone: columns[1].trim(),
                    email: columns[2].trim(),
                    degree: columns[3].trim(),
                    college: columns[4].trim(),
                    cgpa: columns[5].trim(),
                    resume: columns[6].trim()
                };
                students.push(studentData);
            }
        });

        localStorage.setItem("students2", JSON.stringify(students));
        alert("CSV Data Uploaded Successfully!");
        displayStudents();
    }

    // Display Students with Delete Option
    function displayStudents() {
        const studentTableBody = document.querySelector("#student-table tbody");
        studentTableBody.innerHTML = "";

        let students = JSON.parse(localStorage.getItem("students2")) || [];

        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>${student.degree}</td>
                <td>${student.college}</td>
                <td>${student.cgpa}</td>
                <td>${student.resume}</td>
                <td><button class="delete-btn" onclick="deleteStudent(${index})">❌ Delete</button></td>
            `;
            studentTableBody.appendChild(row);
        });
    }

    // Make deleteStudent globally accessible
window.deleteStudent = function (index) {
    let students = JSON.parse(localStorage.getItem("students2")) || [];

    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students2", JSON.stringify(students));
        displayStudents(); // Refresh the table
    }
};

    // Load existing students on page load
    displayStudents();
});



