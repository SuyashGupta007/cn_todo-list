document.addEventListener('DOMContentLoaded', () => {
  const newTaskInput = document.getElementById('new-task');
  const todoList = document.getElementById('todo-list');
  const taskCount = document.getElementById('task-count');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const clearCompletedButton = document.getElementById('clear-completed');

  let tasks = [];
  let filter = 'all';

  function renderTasks() {
      todoList.innerHTML = '';
      const filteredTasks = tasks.filter(task => {
          if (filter === 'all') return true;
          if (filter === 'active') return !task.completed;
          if (filter === 'completed') return task.completed;
      });

      filteredTasks.forEach((task, index) => {
          const li = document.createElement('li');
          li.className = task.completed ? 'completed' : '';
          li.innerHTML = `
              <span>${task.text}</span>
              <div>
                  <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
                  <button onclick="deleteTask(${index})">&times;</button>
              </div>
          `;
          todoList.appendChild(li);
      });

      updateTaskCount();
  }

  function updateTaskCount() {
      const activeTasks = tasks.filter(task => !task.completed).length;
      taskCount.innerText = `${activeTasks} tasks left`;
  }

  newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && newTaskInput.value.trim()) {
          tasks.push({ text: newTaskInput.value.trim(), completed: false });
          newTaskInput.value = '';
          renderTasks();
      }
  });

  window.toggleTask = function(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
  };

  window.deleteTask = function(index) {
      tasks.splice(index, 1);
      renderTasks();
  };

  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          filter = button.id.replace('-tasks', '');
          renderTasks();
      });
  });

  clearCompletedButton.addEventListener('click', () => {
      tasks = tasks.filter(task => !task.completed);
      renderTasks();
  });

  renderTasks();
});
