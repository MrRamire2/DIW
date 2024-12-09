const TASKSJSON = [
    {
        id: 1,
        title: "clean dishes",
        priority: "low"
    },
    {
        id: 2,
        title: "study jQuery",
        priority: "medium"
    }
];

$(()=>{


    let tasks = loadTasksFromLS();

    if(tasks.length === 0){
        tasks = TASKSJSON;
        saveTasksToLS(tasks);
    }else{
        console.log(tasks);
    }

    $.each(tasks, function(index, task) {
        appendTask(task);
    });

    $("#btn-add-task").on("click", ()=>{
        const taskTitle = $("#task-title").val().trim();
        const taskPriority = $("#task-priority").val();

        if(taskTitle){
            let task = {
                title: taskTitle,
                priority: taskPriority
            }

            tasks.push(task);

            appendTask(task);
            saveTasksToLS(tasks);
        }else{
            
        }

        $("#task-title").val("");
    });

});


function appendTask(task) {
    $("#todo-list").append(`<li> ${task.title} - ${task.priority}</li>`);
}

function loadTasksFromLS() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLS(tasks) {
    return localStorage.setItem("tasks", JSON.stringify(tasks));
}