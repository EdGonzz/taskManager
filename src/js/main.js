const $htmlElement = document.querySelector('html');
const $toggleThemeBtn = document.getElementById('toggleThemeBtn');
const $addTaskForm = document.getElementById('add-task-form');
const $listContainer = document.getElementById('list-container');
const $themeIcon = document.getElementById('theme-icon');
const $themeText = document.getElementById('theme-text');

loadLocalStorage();

const currentTheme = localStorage.getItem('theme');

function switchTheme() {
  $htmlElement.classList.toggle('dark');
  $themeIcon.classList.toggle('theme-dark');
  $themeText.textContent = $htmlElement.classList.contains('dark') ? 'Dark Mode' : 'Light Mode';

  localStorage.setItem('theme', $htmlElement.classList.contains('dark') ? 'dark' : 'light');
}

$toggleThemeBtn.addEventListener('click', () => {
  if (!document.startViewTransition) {
    switchTheme();
  }
  document.startViewTransition(() => switchTheme());
});

if (currentTheme === 'dark') {
  $htmlElement.classList.add('dark');
  $themeIcon.classList.add('theme-dark');
  $themeText.textContent = 'Light Mode';
} else {
  $themeText.textContent = 'Dark Mode';
}

function addTask(value) {
  const { text, checked } = value;
  if (text) {
    const $taskList = document.createElement('li');
    $taskList.classList.add('task-list');
    if (checked) {
      $taskList.classList.add('checked');
    }

    const $taskText = document.createElement('span');
    $taskText.textContent = text;
    $taskText.setAttribute('id', 'task-text');
    $taskText.classList.add('task-text');

    $taskList.appendChild($taskText);

    $listContainer.appendChild($taskList);

    createActionsBtn($taskList, $taskText);
  }
}

function createActionsBtn(parentList, childList) {
  const $check = document.createElement('span');
  $check.classList.add('check');
  $check.setAttribute('id', 'check');

  const $delete = document.createElement('span');
  $delete.classList.add('delete');
  $delete.setAttribute('id', 'delete');

  const $edit = document.createElement('span');
  $edit.classList.add('pencil');
  $edit.setAttribute('id', 'edit');

  parentList.insertAdjacentElement('afterbegin', $check);
  parentList.insertAdjacentElement('beforeend', $delete);
  childList.insertAdjacentElement('afterend', $edit);
}

$addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const $taskInput = document.getElementById('task-input');

  addTask({ text: $taskInput.value, checked: false });
  saveLocalStorage($taskInput.value);
  $taskInput.value = '';
});

function editTask(element) {
  if (element.classList.contains('checked')) {
    element.setAttribute('disabled', true);
  } else {
    let replace = prompt('Enter the new task name:', element.firstChild.nextSibling.textContent);
    if (replace !== null && replace !== '' && replace !== undefined) {
      element.firstChild.nextSibling.textContent = replace;
      updateLocalStorage();
    }
  }
}

function deleteTask(element) {
  if (confirm('Are you sure you want to delete this task?')) {
    element.remove();
    updateLocalStorage();
  }
}

function checkTask(element) {
  element.classList.toggle('checked');
  updateLocalStorage();
}

$listContainer.addEventListener('click', (e) => {
  if (e.target.id === 'delete') {
    deleteTask(e.target.parentElement);
  } else if (e.target.id === 'edit') {
    editTask(e.target.parentElement);
  } else if (e.target.id === 'check') {
    checkTask(e.target.parentElement);
  }
});

function saveLocalStorage(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push({ text: task, checked: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadLocalStorage() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    addTask(task);
    console.log(task);
  });
}

function updateLocalStorage() {
  const tasks = Array.from(document.querySelectorAll('.task-list')).map((task) => ({ text: task.firstChild.nextSibling.textContent, checked: task.classList.contains('checked') }
  ))

  localStorage.setItem('tasks', JSON.stringify(tasks));
}