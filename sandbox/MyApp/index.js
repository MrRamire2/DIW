import { saveTask, getTasks, onGetTasks } from "./firebase.js"

const taskForm = document.getElementById("task-form");
const btnSave = document.getElementById("btn-task-save");
const taskFContainer = document.getElementById("task-container");

// Obtener coleccion
window.addEventListener("DOMContentLoaded", 
    async () => {
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


    // const querySnapshot = await getTasks();

    // querySnapshot.forEach((doc) => {
    //     console.log(doc.id, " =>", doc.data());

    //     const task = doc.data();

    //     html += `
    //         <div>
    //             <h3>${task.title}</h3>
    //             <p>${task.description}</p>
    //             <p>${task.priority}</p>  

    //         </div>
    //     `;
    // });

});

// Crear documento
btnSave.addEventListener("click", (e) => {
    e.preventDefault();

    console.log("submitted");

    const taskTitle = taskForm["task-title"];
    const taskDescrtiption = taskForm["task-description"];
    const taskPriority = taskForm["task-priority"];

    saveTask(taskTitle.value, taskDescrtiption.value, taskPriority.value);

    taskForm.reset();
})