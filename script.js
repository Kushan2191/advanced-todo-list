
const taskInput = document.getElementById("task-name");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const progressBar = document.getElementById("progress-bar");


let tasks = [];


addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = "";
        renderTasks();
    }
});


function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("li");
        taskElement.className = `task ${task.completed ? "completed" : ""}`;

        taskElement.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${index})">
            <span>${task.name}</span>
            <div class="task-buttons">
                <button onclick="deleteTask(${index})">✖</button>
            </div>
        `;

        taskList.appendChild(taskElement);
    });

    updateProgressBar();
}


function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}


function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function updateProgressBar() {
    const completedTasks = tasks.filter(task => task.completed).length;
    progressBar.value = tasks.length ? (completedTasks / tasks.length) * 100 : 0;
}


document.getElementById("current-date").innerText = new Date().toDateString();
