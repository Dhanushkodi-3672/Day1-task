let people = [];
let editIndex = null;
function renderTable() {
  const tableBody = document.querySelector("#details tbody");
  tableBody.innerHTML = "";

  people.forEach((person, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${person.name}</td>
        <td>${person.age}</td>
        <td>
          <button onclick="startEdit(${index})">Edit</button>
          <button onclick="deletePerson(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  // Update form button text
  const submitBtn = document.getElementById("submitBtn");
  const cancelBtn = document.getElementById("cancelBtn");
  if (editIndex === null) {
    submitBtn.textContent = "Submit";
    cancelBtn.style.display = "none";
  } else {
    submitBtn.textContent = "Update";
    cancelBtn.style.display = "inline-block";
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");

  const name = nameInput.value.trim();
  const age = ageInput.value.trim();

  if (name === "" || age === "") {
    alert("Please enter both name and age.");
    return;
  }

  if (editIndex === null) {
    // Add new
    people.push({ name, age });
  } else {
    // Update existing
    people[editIndex] = { name, age };
    editIndex = null;
  }

  nameInput.value = "";
  ageInput.value = "";
  renderTable();
}

function startEdit(index) {
  const person = people[index];
  document.getElementById("name").value = person.name;
  document.getElementById("age").value = person.age;
  editIndex = index;
  renderTable();
}

function cancelEdit() {
  editIndex = null;
  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  renderTable();
}

function deletePerson(index) {
  if (confirm("Are you sure you want to delete this person?")) {
    people.splice(index, 1);
    if (editIndex === index) cancelEdit(); 
    renderTable();
  }
}
