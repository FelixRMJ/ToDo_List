
// INDEX

//1.- DEFINE UI VARS
//2.- LOAD ALL EVENT LISTENERS
//  2.1.- LOAD DOM EVENT
//  2.2.- ADD TASK EVENT
//  2.3.- REMOVE TASK EVENT
//  2.4.- CLEAR TASKS EVENT
//  2.5.- FILTER TASKS EVENT
//  2.6.- GET TASKS FROM LOCAL STORAGE

//3.- ADD TASK
//  3.1.- CREATE LI ELEMENT
//    3.1.1- ADD CLASS TO LI ELEMENT
//    3.1.2.- CREATE TEXT NODE AND APPEND TO LI ELEMENT
//  3.2.- CREATE LINK ELEMENT
//    3.2.1- ADD CLASS TO THE LINK ELEMENT
//    3.2.2.- ADD ICON HTML
//    3.3.3.- APPEND THE LINK TO LI
//  3.3.- APPEND THE LI TO THE UL
//  3.4.- STORE IN LOCAL STORAGE
//  3.5.- CLEAR INPUT

//4.- STORE TASK FUNCTION

//5.- REMOVE TASK

//6.- CLEAR TASKS
//  6.1.- METHOD INNERHTML (NOT THE MOST RECOMMENDED)
//  6.1.- METHOD REMOVECHILD (FASTER BUT NOT TOO MUCH)
//7.- FILTER TASKS

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

  //Load DOM event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  // Clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
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
  });
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

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
 if(e.target.parentElement.classList.contains('delete-item')) {
   if(confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();

    //Remove from Local Storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
   }
 }
}

// removeTaskFromLocalStorage
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear tasks
function clearTasks(e){
  // One option
  // taskList.innerHTML = '';

  //Faster option but not too much faster
  while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);

  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear tasks from local storage function
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display='none';
    }
  });
}
