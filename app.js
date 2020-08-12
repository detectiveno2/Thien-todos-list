// Selector.
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event listeners.
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', loadTodosStorage);

// Functions.
function loadTodosStorage() {
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (!todos) {
    todos = [];
  }

  todos.forEach(function (todo) {
    // Generate element.
    const todoItem = document.createElement('li');
    const completeButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const todoDiv = document.createElement('div');

    // Add class for element.
    todoItem.classList.add('todo-item');
    completeButton.classList.add('complete-btn');
    deleteButton.classList.add('delete-btn');
    todoDiv.classList.add('todo');
    if (todo.completed) {
      todoDiv.classList.add('completed');
    }

    todoItem.innerText = todo.value;

    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

    // Append.
    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(completeButton);
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
  });
}

function addTodoStorage(todo) {
  // Get todos.
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (!todos) {
    todos = [];
  }

  // Add todo.
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function toggleCompleteStorage(todo) {
  // Get value of todo.
  const value = todo.children[0].innerText;

  // Get todos.
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (!todos) {
    todos = [];
  }

  // Toggle.
  const foundTodo = todos.find(function (todo) {
    return todo.value === value;
  });
  foundTodo.completed = !foundTodo.completed;

  // Save to local storage.
  localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoStorage(todo) {
  // Get value of todo.
  const value = todo.children[0].innerText;

  // Get todos.
  let todos = JSON.parse(localStorage.getItem('todos'));
  if (!todos) {
    todos = [];
  }

  // Delete todo.
  let indexTodo;
  for (let i = 0; i < todos.length; i++) {
    if (todos[i].value === value) {
      indexTodo = i;
      break;
    }
  }
  todos.splice(indexTodo, 1);

  // Save to local storage.
  localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo(event) {
  event.preventDefault();

  // Get and validate value of todo.
  const value = todoInput.value;
  value.trim();
  if (!value) return;

  // Generate element.
  const todoItem = document.createElement('li');
  const completeButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const todoDiv = document.createElement('div');

  // Add class for element.
  todoItem.classList.add('todo-item');
  completeButton.classList.add('complete-btn');
  deleteButton.classList.add('delete-btn');
  todoDiv.classList.add('todo');

  // Add value for todo-item.
  todoItem.innerText = value;

  completeButton.innerHTML = '<i class="fas fa-check"></i>';
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

  // Append.
  todoDiv.appendChild(todoItem);
  todoDiv.appendChild(completeButton);
  todoDiv.appendChild(deleteButton);
  todoList.appendChild(todoDiv);

  // Add to local storage.
  const todo = {
    value: value,
    completed: false,
  };
  addTodoStorage(todo);

  // Clear input.
  todoInput.value = '';
}

function deleteCheck(event) {
  const button = event.target;
  const todo = button.parentElement;

  // Delete todo.
  if (button.classList[0] === 'delete-btn') {
    todo.classList.add('fall');
    deleteTodoStorage(todo);

    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
  }

  // Complete todo.
  if (button.classList[0] === 'complete-btn') {
    todo.classList.toggle('completed');
    toggleCompleteStorage(todo);
  }
}

function filterTodo() {
  const todos = todoList.childNodes;
  const value = filterOption.value;

  todos.forEach(function (todo) {
    switch (value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}
