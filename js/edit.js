const title = document.getElementById("title");
const description = document.getElementById("desc");
const create = document.getElementById("create");
const tasksJSON = localStorage.getItem('tasks_json');

const urlParam = new URL(window.location.href).searchParams.get('timestamp');

window.onload = () => {
    fetchTask();
    addChip();
}

const fetchTask = () => {
    JSON.parse(tasksJSON).forEach(task =>{
        if(urlParam == task.created){
            title.value = task.todo;
            description.value = task.description;
            task.tags.forEach(tag =>{
                createChip(tag);
            })
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
            tasks[i].tags = fetchTags();
            tasks[i].updated =  timestamp;
            break;  
        }
    }
    localStorage.setItem('tasks_json', JSON.stringify(tasks));
    location.href = "../index.html";
}

const fetchTags = () => {
    var tagsArray = [];
    document.getElementById("chips").querySelectorAll('.chip--text').forEach(element => {
        tagsArray.push(element.innerHTML);
    })
    return tagsArray;
}