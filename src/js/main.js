const $htmlElement = document.querySelector('html');
const $toggleThemeBtn = document.getElementById('toggleThemeBtn');
const $addTaskForm = document.getElementById('add-task-form');
const $listContainer = document.getElementById('list-container');

$toggleThemeBtn.addEventListener('click', () => {
  $htmlElement.classList.toggle('dark');
});

function addTask(value) {
  if (value !== null && value !== '' && value !== undefined) {
    const $taskList = document.createElement('li');
    $taskList.classList.add('task-list');

    const $taskText = document.createElement('span');
    $taskText.innerText = value;
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
  childList.insertAdjacentElement('beforeend', $edit);
}

$addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const $taskInput = document.getElementById('task-input');

  addTask($taskInput.value);
});

function editTask(element) {
  if (element.parentElement.classList.contains('checked')) {
    element.setAttribute('disabled', true);
  } else {
    let replace = prompt('Enter the new task name:', element.firstChild.textContent);
    if (replace !== null && replace !== '' && replace !== undefined) {
      element.firstChild.textContent = replace;
    }
  }
}

function deleteTask(element) {
  if (confirm('Are you sure you want to delete this task?')) {
    element.remove();
  }
}

function checkTask(element) {
  element.classList.toggle('checked');
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