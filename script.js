let skillList = JSON.parse(localStorage.getItem("skills")) || [];

const skillForm = document.getElementById("skillForm");
const skillInput = document.getElementById("skillInput");
const prioritySelect = document.getElementById("prioritySelect");
const statusSelect = document.getElementById("statusSelect");
const skillListEl = document.getElementById("skillList");
const filterStatus = document.getElementById("filterStatus");

function saveSkills() {
  localStorage.setItem("skills", JSON.stringify(skillList));
}

function renderSkills() {
  const filter = filterStatus.value;
  skillListEl.innerHTML = "";

  const filtered = filter === "All"
    ? skillList
    : skillList.filter(skill => skill.status === filter);

  filtered.forEach((skill, index) => {
    const li = document.createElement("li");
    li.className = "skill-item";

    li.innerHTML = `
      <div class="skill-info">
        <p><strong>Skill:</strong> ${skill.name}</p>
        <p><strong>Priority:</strong> ${skill.priority}</p>
        <p><strong>Status:</strong> ${skill.status}</p>
      </div>
      <div class="skill-buttons">
        <button class="update-btn" onclick="updateSkill(${index})">Update</button>
        <button class="delete-btn" onclick="deleteSkill(${index})">Delete</button>
      </div>
    `;
    skillListEl.appendChild(li);
  });
}

function addSkill(e) {
  e.preventDefault();
  const skill = {
    name: skillInput.value.trim(),
    priority: prioritySelect.value,
    status: statusSelect.value,
  };
  if (skill.name !== "") {
    skillList.push(skill);
    saveSkills();
    renderSkills();
    skillForm.reset();
  }
}

function deleteSkill(index) {
  skillList.splice(index, 1);
  saveSkills();
  renderSkills();
}

function updateSkill(index) {
  const newStatus = prompt("Enter new status (Not Started, In Progress, Completed):", skillList[index].status);
  if (newStatus && ["Not Started", "In Progress", "Completed"].includes(newStatus)) {
    skillList[index].status = newStatus;
    saveSkills();
    renderSkills();
  } else {
    alert("Invalid status.");
  }
}

skillForm.addEventListener("submit", addSkill);
filterStatus.addEventListener("change", renderSkills);

// Initial render
renderSkills();
