const todoListHigh = document.querySelector(".high__items");
const todoListLow = document.querySelector(".low__items");
const inputHighTask = document.querySelector(".add__task-high");
const inputLowTask = document.querySelector(".add__task-low");
const formHigh = document.querySelector(".high");
const formLow = document.querySelector(".low");
const form = document.querySelectorAll(".form");
const formInputValue = document.querySelector(".todo__add-input");
const formInputHigh = document.querySelector(".add__task-high");
const formInputLow = document.querySelector(".add__task-low");
formInputHigh.focus();

const STATUS = {
  DONE: "Done",
  TO_DO: "To Do",
};
//
const PRIORITY = {
  HIGH: "High",
  LOW: "Low",
};

let tasks = [];

function addTask(event, priority, input) {
  event.preventDefault();
  const newTask = {
    name: input.value,
    status: STATUS.TO_DO,
    priority: priority,
  };

  const suchTask = tasks.find((task) => task.name === newTask.name);

  if (!suchTask && newTask.name.trim() !== "") {
    tasks.push(newTask);
    render();
  }

  input.value = "";
}

function createElements(priorityList, item) {
  const task = document.createElement("div");
  task.className = "todo__task";

  const taskContent = document.createElement("div");
  taskContent.classList = "todo__task-content";
  task.append(taskContent);

  const label = document.createElement("label");
  label.classList = "todo__task-text";

  const input = document.createElement("input");
  const isDoneCheckbox = item.status === STATUS.DONE ? true : false;
  input.classList = "todo__task-checkbox";
  input.type = "checkbox";
  input.checked = isDoneCheckbox;
  input.dataset.action = "done";
  label.append(input);

  const isDoneText = item.status === STATUS.DONE ? "todo__name todo__name--done" : "todo__name ";
  const span = document.createElement("span");
  span.classList = isDoneText;
  span.textContent = item.name;
  label.append(span);

  taskContent.append(label);

  const button = document.createElement("button");
  button.classList = "todo__icon-delete";
  button.dataset.action = "delete";

  task.append(button);
  priorityList.append(task);
}

function render() {
    todoListHigh.innerHTML = "";
    todoListLow.innerHTML = "";

    tasks.forEach(function (item) {
      if (item.priority === PRIORITY.HIGH) {
        createElements(todoListHigh, item);
      } else {
        createElements(todoListLow, item);
      }
    });
}

const submitHandlerHigh = (event) => {
  addTask(event, PRIORITY.HIGH, inputHighTask);
};

const submitHandlerLow = (event) => {
  addTask(event, PRIORITY.LOW, inputLowTask);
};

formHigh.addEventListener("submit", submitHandlerHigh);
formLow.addEventListener("submit", submitHandlerLow);

todoListHigh.addEventListener("click", deleteTask);
todoListLow.addEventListener("click", deleteTask);

function deleteTask(event) {
  if (event.target.dataset.action === "delete") {
    const parentNode = event.target.closest(".todo__task");
    const taskName = parentNode.querySelector(".todo__name").textContent;
    tasks = tasks.filter((task) => task.name !== taskName);
    render();
  }
}

todoListLow.addEventListener("click", doneTask);
todoListHigh.addEventListener("click", doneTask);

function doneTask(event) {
  if (event.target.dataset.action !== "done") return;

  const parentNode = event.target.closest(".todo__task");
  const taskName = parentNode.querySelector(".todo__name").textContent;

  const changeStatus = tasks.find((task) => task.name === taskName);
  changeStatus.status = changeStatus.status === STATUS.TO_DO ? STATUS.DONE : STATUS.TO_DO;
  const taskTitle = parentNode.querySelector(".todo__name");
  taskTitle.classList.toggle("todo__name--done");
  render();
}

render();
