import { saveTask, getTasks, onGetTasks } from "./firebase.js"

const taskForm = document.getElementById("task-form");
const taskDelete = document.getElementById("btn-delete");
const taskFContainer = document.getElementById("task-container");

// Obtener coleccion
window.addEventListener("DOMContentLoaded", async () => {
    console.log("loaded");


    onGetTasks((querySnapshot) => {
        let html = "";

        querySnapshot.forEach((doc) => {
            const task = doc.data();

            html += `
            <div class="colecciones">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <p>${task.priority}</p>  
                <button id="btn-delete">Delete</button>
            </div>
        `;
        });
        taskFContainer.innerHTML = html;
    });


});

taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("submited")

    const taskTitle = taskForm["task-title"];
    const taskDescrtiption = taskForm["task-description"];
    const taskPriority = taskForm["task-priority"];

    saveTask(taskTitle.value, taskDescrtiption.value, taskPriority.value)
    .then((taskIdSaved) => {
        console.log("Task saved with ID: ", taskIdSaved);
    })
    .catch((error) => {
        console.log("Error saving task: ", error);
    })
})