const tasks = [];

  const totalEl = document.getElementById("totalTasks");
  const completedEl = document.getElementById("completedTasks");
  const list = document.getElementById("taskList");
  const emptyText = document.getElementById("emptyText");
  const canvas = document.getElementById("progressCanvas");
  const ctx = canvas.getContext("2d");

  function addTask() {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if (!title || !desc) {
      alert("Please fill all fields");
      return;
    }

    if (tasks.some(t => t.title === title)) {
      alert("Task already exists");
      return;
    }

    tasks.push({ title, desc, done: false });
    taskTitle.value = "";
    taskDesc.value = "";
    updateUI();
  }

  function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    updateUI();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    updateUI();
  }

  function updateUI() {
    list.innerHTML = "";
    emptyText.style.display = tasks.length ? "none" : "block";

    const completedCount = tasks.filter(t => t.done).length;

    totalEl.textContent = tasks.length;
    completedEl.textContent = completedCount;

    tasks.forEach((task, i) => {
      const li = document.createElement("li");
      if (task.done) li.classList.add("done");

      li.innerHTML = `
        <strong>${task.title}</strong><br>
        <small>${task.desc}</small>
        <div class="actions">
          <button class="complete-btn" onclick="toggleTask(${i})">
            ${task.done ? "Undo" : "Complete"}
          </button>
          <button class="delete-btn" onclick="deleteTask(${i})">Delete</button>
        </div>
      `;
      list.appendChild(li);
    });

    drawCanvas(completedCount, tasks.length);
  }

  function drawCanvas(done, total) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (total === 0) return;

    const width = (done / total) * canvas.width;
    ctx.fillStyle = "#16a34a";
    ctx.fillRect(0, 0, width, canvas.height);

    ctx.fillStyle = "#374151";
    ctx.font = "14px Arial";
    ctx.fillText(`Completed ${done} / ${total}`, 10, 20);
  }
