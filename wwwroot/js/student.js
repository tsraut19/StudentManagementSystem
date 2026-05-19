const apiUrl = "/api/students";

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
});


// ======================
// LOAD STUDENTS
// ======================

async function loadStudents() {

    const response = await fetch(apiUrl);

    const students = await response.json();

    const tableBody =
        document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    students.forEach(student => {

        tableBody.innerHTML += `
            <tr>

                <td>${student.id}</td>

                <td>${student.name}</td>

                <td>${student.email}</td>

                <td>${student.course}</td>

                <td>

                    <button class="btn btn-warning btn-sm"
                        onclick="editStudent(${student.id})">
                        Edit
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="deleteStudent(${student.id})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });

    updateDashboard(students);
}


// ======================
// SHOW ADD FORM
// ======================

function showAddForm() {

    clearForm();

    document.getElementById("formTitle")
        .innerText = "Add Student";

    document.getElementById("formSection")
        .style.display = "block";

    document.getElementById("listSection")
        .style.display = "none";
}


// ======================
// HIDE FORM
// ======================

function hideForm() {

    document.getElementById("formSection")
        .style.display = "none";

    document.getElementById("listSection")
        .style.display = "block";
}


// ======================
// SAVE STUDENT
// ======================

async function saveStudent() {
    debugger;
    const id =
        document.getElementById("studentId").value;

    const student = {

        id: parseInt(id || 0),

        name:
            document.getElementById("name").value,

        email:
            document.getElementById("email").value,

        course:
            document.getElementById("course").value
    };

    // Validation
    if (!student.name ||
        !student.email ||
        !student.course) {

        alert("All fields are required");
        return;
    }

    // UPDATE
    if (id) {

        await fetch(`${apiUrl}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });

    }
    else {
        debugger;
        // ADD
        await fetch(apiUrl, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)
        });
    }

    hideForm();

    loadStudents();
}


// ======================
// EDIT STUDENT
// ======================

async function editStudent(id) {

    const response =
        await fetch(`${apiUrl}/${id}`);

    const student =
        await response.json();

    document.getElementById("studentId")
        .value = student.id;

    document.getElementById("name")
        .value = student.name;

    document.getElementById("email")
        .value = student.email;

    document.getElementById("course")
        .value = student.course;

    document.getElementById("formTitle")
        .innerText = "Edit Student";

    document.getElementById("formSection")
        .style.display = "block";

    document.getElementById("listSection")
        .style.display = "none";
}


// ======================
// DELETE STUDENT
// ======================

async function deleteStudent(id) {

    const confirmDelete =
        confirm("Are you sure to delete?");

    if (!confirmDelete)
        return;

    await fetch(`${apiUrl}/${id}`, {

        method: "DELETE"
    });

    loadStudents();
}


// ======================
// CLEAR FORM
// ======================

function clearForm() {

    document.getElementById("studentId")
        .value = "";

    document.getElementById("name")
        .value = "";

    document.getElementById("email")
        .value = "";

    document.getElementById("course")
        .value = "";
}


// ======================
// DASHBOARD
// ======================

function updateDashboard(students) {

    document.getElementById("studentCount")
        .innerText = students.length;
}