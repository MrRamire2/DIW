import { saveTask } from "./firebase.js"

const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("submitted");

    const taskTitle = taskForm["task-title"];
    const taskDescrtiption = taskForm["task-description"];
    const taskPriority = taskForm["task-priority"];

    saveTask(taskTitle.value, taskDescrtiption.value, taskPriority.value);

    taskForm.reset();
})