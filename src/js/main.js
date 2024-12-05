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
    $taskList.innerText = value;
    $taskList.classList.add('task-list');

    $listContainer.appendChild($taskList);

    createActionsBtn($taskList);
  }
}

function createActionsBtn(reference) {
  const $check = document.createElement('span');
  $check.classList.add('check');
  $check.setAttribute('id', 'check');

  const $delete = document.createElement('span');
  $delete.classList.add('delete');
  $delete.setAttribute('id', 'delete');

  reference.insertAdjacentElement('afterbegin', $check);
  reference.insertAdjacentElement('beforeend', $delete);
}

$addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const $taskInput = document.getElementById('task-input');

  addTask($taskInput.value);
});