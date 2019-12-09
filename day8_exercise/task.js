const taskForm = document.querySelector(".js-taskForm");
const taskInput = taskForm.querySelector("input");
const pendingList = document.querySelector(".js-pendingList");
const finishedList = document.querySelector(".js-finishedList");

// LocalStorage variable
const TASK_LS = "tasks";
const FIN_TASK_LS = "Fin_tasks";

let tasks = [];
let FIN_tasks = [];

//삭제버튼 공통
function deleteTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  pendingList.removeChild(li);
  const cleanTasks = tasks.filter(function(task) {
    return task.id !== parseInt(li.id, 10);
  });
  tasks = cleanTasks;
  saveTasks();
}

function deleteFIN_Task(event) {
  const btn = event.target;
  const li = btn.parentNode;
  finishedList.removeChild(li);
  const cleanTasks = FIN_tasks.filter(function(task) {
    return task.id !== parseInt(li.id, 10);
  });
  FIN_tasks = cleanTasks;
  saveFIN_Tasks();
}

function moveToFinishedTask(event) {
  //task에 있던거 삭제
  const btn = event.target;
  const li = btn.parentNode;
  const text = tasks[li.id - 1].text;
  pendingList.removeChild(li);
  const cleanTasks = tasks.filter(function(task) {
    return task.id !== parseInt(li.id, 10);
  });
  tasks = cleanTasks;
  saveTasks();

  //다른이름으로 생성
  //text에 그 값이 있음.
  paintFIN_Task(text);
}
function moveToPendingTask(event) {
  const btn = event.target;
  const li = btn.parentNode;
  const text = FIN_tasks[li.id - 1].text;
  finishedList.removeChild(li);
  const cleanTasks = FIN_tasks.filter(function(task) {
    return task.id !== parseInt(li.id, 10);
  });
  FIN_tasks = cleanTasks;
  saveFIN_Tasks();

  paintTask(text);
}

function saveTasks() {
  localStorage.setItem(TASK_LS, JSON.stringify(tasks));
}
function saveFIN_Tasks() {
  localStorage.setItem(FIN_TASK_LS, JSON.stringify(FIN_tasks));
}

function paintTask(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finishedBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = tasks.length + 1;
  delBtn.innerText = "❌";
  finishedBtn.innerText = "✅";
  delBtn.addEventListener("click", deleteTask);
  finishedBtn.addEventListener("click", moveToFinishedTask);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finishedBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const taskObj = {
    text: text,
    id: newId
  };
  tasks.push(taskObj);
  saveTasks();
}

function paintFIN_Task(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const returnBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = FIN_tasks.length + 1;
  delBtn.innerText = "❌";
  returnBtn.innerText = "⏪";
  delBtn.addEventListener("click", deleteFIN_Task);
  returnBtn.addEventListener("click", moveToPendingTask);
  span.innerText = text;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(returnBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const taskObj = {
    text: text,
    id: newId
  };
  FIN_tasks.push(taskObj);
  saveFIN_Tasks();
}

//task를 입력했을 때 발생하는 함수
function handleSubmit(event) {
  event.preventDefault();
  //taskInput의 입력된 값을 paintToDo로
  const currentValue = taskInput.value;
  paintTask(currentValue);
  //input 지워주기
  taskInput.value = "";
}

function loadTasks() {
  const loadedTasks = localStorage.getItem(TASK_LS);
  if (loadedTasks !== null) {
    const parsedTasks = JSON.parse(loadedTasks);
    parsedTasks.forEach(function(task) {
      paintTask(task.text);
    });
  }
}
function loadFIN_Tasks() {
  const loadedFIN_Tasks = localStorage.getItem(FIN_TASK_LS);
  if (loadedFIN_Tasks !== null) {
    const parsedFIN_Tasks = JSON.parse(loadedFIN_Tasks);
    parsedFIN_Tasks.forEach(function(task) {
      paintFIN_Task(task.text);
    });
  }
}

function init() {
  loadTasks();
  loadFIN_Tasks();
  taskForm.addEventListener("submit", handleSubmit);
}
init();
