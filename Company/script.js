document.addEventListener("DOMContentLoaded", function () {
    loadStudentData();
    loadFilteredStudentData();
});

// Load all students in company dashboard
function loadStudentData() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentTable = document.getElementById("student-list");

    studentTable.innerHTML = ""; // Clear previous data

    students.forEach((student, index) => {
        let row = `<tr>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.course}</td>
            <td>${student.cgpa}</td>
            <td>${student.resume !== "Not Uploaded" ? `<a href="#">${student.resume}</a>` : "Not Uploaded"}</td>
            <td><button onclick="deleteStudent(${index})" class="btn-danger">Delete</button></td>
        </tr>`;
        studentTable.innerHTML += row;
    });
}

// Delete student record
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        loadStudentData();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadFilteredStudentData();
});



// load student data into collge
function loadFilteredStudentData() {
    let students = JSON.parse(localStorage.getItem("students2")) || []; 
    let collegeFilter = document.getElementById("college-filter");
    let cgpaFilter = document.getElementById("cgpa-filter");
    let filteredStudentTable = document.getElementById("filtered-student-list");

    // Clear previous options to prevent duplicates
    collegeFilter.innerHTML = `<option value="all">All Colleges</option>`;
    cgpaFilter.innerHTML = `<option value="all">All CGPA</option>`;

    // Populate dropdowns with unique College and CGPA values
    let colleges = [...new Set(students.map(student => student.college))];
    let cgpas = [...new Set(students.map(student => student.cgpa))];

    colleges.forEach(college => {
        let option = document.createElement("option");
        option.value = college;
        option.textContent = college;
        collegeFilter.appendChild(option);
    });

    cgpas.forEach(cgpa => {
        let option = document.createElement("option");
        option.value = cgpa;
        option.textContent = cgpa;
        cgpaFilter.appendChild(option);
    });

 // Function to display students based on filter
function displayFilteredStudents(filterCollege = "all", filterCGPA = "all") {
    let filteredStudentTable = document.getElementById("filtered-student-list");
    filteredStudentTable.innerHTML = ""; // Clear previous data

    students.forEach(student => {
        if ((filterCollege === "all" || student.college === filterCollege) &&
            (filterCGPA === "all" || student.cgpa === filterCGPA)) {

            let resumeLink = student.resume !== "Not Uploaded" 
                ? `<a href="${student.resume}" target="_blank">View Resume</a>` 
                : "Not Uploaded";

            let row = `<tr>
                <td>${student.name}</td>
                <td>${student.phone}</td>
                <td>${student.email}</td>
                <td>${student.degree}</td>
                <td>${student.college}</td>
                <td>${student.cgpa}</td>
                <td>${resumeLink}</td>
            </tr>`;
            filteredStudentTable.innerHTML += row;
        }
    });
}

    // Load all students initially
    displayFilteredStudents();

    // Event Listeners for Filters
    collegeFilter.addEventListener("change", function () {
        displayFilteredStudents(this.value, cgpaFilter.value);
    });

    cgpaFilter.addEventListener("change", function () {
        displayFilteredStudents(collegeFilter.value, this.value);
    });
}




// Add Job Requirement
document.getElementById("job-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let requirements = JSON.parse(localStorage.getItem("companyRequirements")) || [];

    const jobData = {
        position: document.getElementById("position").value,
        description: document.getElementById("description").value,
        location: document.getElementById("location").value,
        package: document.getElementById("package").value,
        jobType: document.getElementById("jobType").value,
        timePosted: new Date().toLocaleString()
    };

    requirements.push(jobData);
    localStorage.setItem("companyRequirements", JSON.stringify(requirements));

    alert("Job Requirement Added Successfully!");
    document.getElementById("job-form").reset();
});

// Logout function
function logout() {
    alert("Logged out successfully!");
    window.location.href = "login.html"; // Redirect to login page
}

// Go Back function
function goBack() {
    window.history.back();
}
