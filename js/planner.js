
// GET HTML ELEMENTS

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

const addButton = document.getElementById("add-task-btn");
const cancelButton = document.getElementById("cancel-btn");

// LOAD SAVED TASKS

let tasks = JSON.parse(
  localStorage.getItem("academicTasks")
) || [];

let currentFilter = "all";

// CALENDAR VARIABLES

let displayedDate = new Date();
let selectedDate = new Date();


// DISPLAY CURRENT DATE

document.getElementById("current-date").textContent =
  new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });


// OPEN AND CLOSE TASK FORM

addButton.addEventListener("click", () => {
  taskForm.hidden = false;
});

cancelButton.addEventListener("click", () => {
  taskForm.reset();
  taskForm.hidden = true;
});


// SAVE TASKS

function saveTasks() {
  localStorage.setItem(
    "academicTasks",
    JSON.stringify(tasks)
  );
}


// ADD NEW TASK

taskForm.addEventListener("submit", (event) => {

  event.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const course = document.getElementById("task-course").value.trim();
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  if (!title || !course || !deadline) return;

  const newTask = {
    id: Date.now(),
    title: title,
    course: course,
    deadline: deadline,
    priority: priority,
    completed: false
  };

  tasks.push(newTask);

  saveTasks();
  renderTasks();
  renderCalendar();

  taskForm.reset();
  taskForm.hidden = true;

});


// DISPLAY TASKS

function renderTasks() {

  taskList.innerHTML = "";

  let filteredTasks = tasks.filter(task => {

    if (currentFilter === "pending") {
      return !task.completed;
    }

    if (currentFilter === "completed") {
      return task.completed;
    }

    return true;

  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML =
      '<p class="empty-message">No tasks to display. Add a new task to get started!</p>';
  }

  filteredTasks.forEach(task => {

    const card = document.createElement("div");
    card.className = `task-card ${task.completed ? "completed" : ""}`;

    const details = document.createElement("div");
    details.className = "task-details";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Complete ${task.title}`);

    checkbox.addEventListener("change", () => {

      task.completed = checkbox.checked;

      saveTasks();
      renderTasks();
      renderCalendar();

    });

    const textContainer = document.createElement("div");

    const heading = document.createElement("h3");
    heading.textContent = task.title;

    const description = document.createElement("p");
    description.textContent =
      `${task.course} · Due ${formatDate(task.deadline)}`;

    textContainer.append(heading, description);
    details.append(checkbox, textContainer);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const priority = document.createElement("span");
    priority.className = `priority ${task.priority}`;
    priority.textContent = task.priority;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", `Delete ${task.title}`);

    deleteButton.addEventListener("click", () => {

      tasks = tasks.filter(item => item.id !== task.id);

      saveTasks();
      renderTasks();
      renderCalendar();

    });

    actions.append(priority, deleteButton);
    card.append(details, actions);

    taskList.appendChild(card);

  });

  updateStatistics();

}


// UPDATE TASK STATISTICS

function updateStatistics() {

  const total = tasks.length;

  const completed = tasks.filter(
    task => task.completed
  ).length;

  const pending = total - completed;

  document.getElementById("total-tasks").textContent = total;

  document.getElementById("completed-tasks").textContent =
    completed;

  document.getElementById("pending-tasks").textContent =
    pending;

}


// FILTER TASKS

document.querySelectorAll(".filter").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelector(".filter.active")
      ?.classList.remove("active");

    button.classList.add("active");

    currentFilter = button.dataset.filter;

    renderTasks();

  });

});


// FORMAT DATES

function formatDate(date) {

  return new Date(date + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric"
    }
  );

}


// CALENDAR NAVIGATION

document.getElementById("prev-month").addEventListener(
  "click", () => {

    displayedDate.setMonth(displayedDate.getMonth() - 1);
    renderCalendar();

  }
);

document.getElementById("next-month").addEventListener(
  "click", () => {

    displayedDate.setMonth(displayedDate.getMonth() + 1);
    renderCalendar();

  }
);


// GENERATE CALENDAR

function renderCalendar() {

  const year = displayedDate.getFullYear();
  const month = displayedDate.getMonth();

  const calendarDays = document.getElementById("calendar-days");

  calendarDays.innerHTML = "";

  document.getElementById("month-year").textContent =
    displayedDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();

  for (let i = 0; i < firstDay; i++) {

    const empty = document.createElement("span");
    calendarDays.appendChild(empty);

  }

  for (let day = 1; day <= daysInMonth; day++) {

    const date = new Date(year, month, day);

    const dateString =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const button = document.createElement("button");

    button.className = "calendar-day";
    button.textContent = day;

    if (
      date.toDateString() === today.toDateString()
    ) {
      button.classList.add("today");
    }

    if (
      date.toDateString() === selectedDate.toDateString()
    ) {
      button.classList.add("selected");
    }

    const hasTask = tasks.some(
      task => task.deadline === dateString
    );

    if (hasTask) {
      button.classList.add("has-task");
    }

    button.addEventListener("click", () => {

      selectedDate = date;

      renderCalendar();
      showSelectedDateTasks(dateString);

    });

    calendarDays.appendChild(button);

  }

  const selectedString = [
    selectedDate.getFullYear(),
    String(selectedDate.getMonth() + 1).padStart(2, "0"),
    String(selectedDate.getDate()).padStart(2, "0")
  ].join("-");

  showSelectedDateTasks(selectedString);

}


// SHOW TASKS FOR SELECTED DATE

function showSelectedDateTasks(date) {

  const container =
    document.getElementById("selected-date-tasks");

  const label =
    document.getElementById("selected-date-label");

  container.innerHTML = "";

  label.textContent =
    `Tasks for ${formatDate(date)}`;

  const selectedTasks = tasks.filter(
    task => task.deadline === date
  );

  if (selectedTasks.length === 0) {

    container.innerHTML =
      '<p class="empty-message">No tasks scheduled for this date.</p>';

    return;

  }

  selectedTasks.forEach(task => {

    const item = document.createElement("div");

    item.className = "selected-task";

    item.textContent =
      `${task.title} — ${task.course} (${task.completed ? "Completed" : "Pending"})`;

    container.appendChild(item);

  });

}


// INITIALISE APPLICATION

renderTasks();
renderCalendar();
