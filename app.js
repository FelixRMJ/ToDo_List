// INDEX

//1.- DEFINE UI VARS
//2.- LOAD ALL EVENT LISTENERS
//  2.1.- ADD TASK EVENT
//  2.2.- REMOVE TASK EVENT
//3.- ADD TASK
//  3.1.-CREATE LI ELEMENT
//    3.1.1- ADD CLASS TO LI ELEMENT
//    3.1.2.- CREATE TEXT NODE AND APPEND TO LI ELEMENT
//  3.2.-CREATE LINK ELEMENT
//    3.2.1-ADD CLASS TO THE LINK ELEMENT
//    3.2.2.-ADD ICON HTML
//    3.3.3.- APPEND THE LINK TO LI
//  3.3.- APPEND THE LI TO THE UL
//  3.4.- CLEAR INPUT
//4.- REMOVE TASK

// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
}

// Add Task
function addTask(e) {
  if(taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Remove Task
function removeTask(e) {
 if(e.target.parentElement.classList.contains('delete-item')) {
   e.target.parentElement.parentElement.remove();
 }
}