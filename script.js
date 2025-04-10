
document.addEventListener("DOMContentLoaded", () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  function renderTasks(filter = 'all') {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    let filteredTasks = tasks;
    if (filter === "done") filteredTasks = tasks.filter(t => t.done);
    if (filter === "todo") filteredTasks = tasks.filter(t => !t.done);

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = task.done ? "done" : "";
      li.innerHTML = `
        <span onclick="toggleTask(${index})">${task.text}</span>
        <button onclick="removeTask(${index})">🗑️</button>
      `;
      list.appendChild(li);
    });
  }

  function addTask() {
    const input = document.getElementById("task-input");
    if (input.value.trim() === "") return;
    tasks.push({ text: input.value.trim(), done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }

  function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
  }

  function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function filterTasks(type) {
    renderTasks(type);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Torna as funções acessíveis ao HTML
  window.addTask = addTask;
  window.toggleTask = toggleTask;
  window.removeTask = removeTask;
  window.filterTasks = filterTasks;

  renderTasks();
});
