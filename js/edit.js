const title = document.getElementById("title");
const description = document.getElementById("desc");
// const tags = document.getElementById()

const create = document.getElementById("create");
const tasksJSON = localStorage.getItem('tasks_json');

const urlParam = new URL(window.location.href).searchParams.get('timestamp');

const fetchTask = () => {

    console.log("bkerbvkreabirea", urlParam);
    JSON.parse(tasksJSON).forEach(task =>{
        if(urlParam == task.created){
            title.value = task.todo;
            description.value = task.description;
            console.log("bjkjareb", task.todo);
        }
    })
}



const editTask = () =>{

    const timestamp = Date.now();
    var tasks = JSON.parse(tasksJSON);
    for (var i = 0; i < tasks.length; i++) {
        if(urlParam === tasks[i].created.toString()){
            tasks[i].todo = title.value;
            tasks[i].description = description.value;
            tasks[i].updated =  timestamp;
            break;  
        }
    }
    localStorage.setItem('tasks_json', JSON.stringify(tasks));
    location.reload();
}

// const checkTaskJson = () =>{
//     const tasksJSON = localStorage.getItem('tasks_json');
//     const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
//     const timestamp = Date.now();
//     let temp = {
//         todo: title.value,
//         description: description.value,
//         tags: "",
//         status: 'Todo',
//         created: timestamp,
//         updated: "",
//     }
//     tasks.push(temp);
//     localStorage.setItem("tasks_json", JSON.stringify(tasks));
// }

fetchTask();