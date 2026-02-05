let todos = JSON.parse(localStorage.getItem('my_todos')) || [];

const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const errorMessage = document.getElementById('error-message');

function addTask(event) {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
        errorMessage.textContent = "Please enter a task name!";
        return;
    }

    const isDuplicate = todos.some(todo => todo.text.toLowerCase() === text.toLowerCase());
    if (isDuplicate) {
        errorMessage.textContent = "This task already exists!";
        return;
    }

    errorMessage.textContent = "";

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(newTodo);

    saveToStorage();
    renderTodos();

    todoForm.reset();
}

function deleteTask(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveToStorage();
    renderTodos();
}

function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveToStorage();
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement('li');

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.className = todo.completed ? "todo-text completed" : "todo-text";
        span.onclick = () => toggleComplete(todo.id);

        const btn = document.createElement('button');
        btn.textContent = "Delete";
        btn.className = "delete-btn";
        btn.onclick = () => deleteTask(todo.id);

        li.appendChild(span);
        li.appendChild(btn);
        todoList.appendChild(li);
    });
}

function saveToStorage() {
    localStorage.setItem('my_todos', JSON.stringify(todos));
}

todoForm.addEventListener('submit', addTask);

renderTodos();
