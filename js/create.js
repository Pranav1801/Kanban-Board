const title = document.getElementById("title");
const description = document.getElementById("desc");

const create = document.getElementById("create");
const create_and_view = document.getElementById("create-and-view");

window.onload = addChip();

const validation = () =>{}

const createTask = () =>{
    checkTaskJson();
    title.value = "";
    description.value = "";
    removeChips();
}

const createAndViewTask = () =>{
    checkTaskJson();
    location.href = "../index.html";
}

const checkTaskJson = () =>{
    const tasksJSON = localStorage.getItem('tasks_json');
    const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    const timestamp = Date.now();
    let temp = {
        todo: title.value,
        description: description.value,
        tags: fetchTags(),
        status: "Todo",
        created: timestamp,
        updated: "",
    }
    tasks.push(temp);
    localStorage.setItem("tasks_json", JSON.stringify(tasks));
}

const fetchTags = () => {
    var tagsArray = [];
    document.getElementById("chips").querySelectorAll('.chip--text').forEach(element => {
        tagsArray.push(element.innerHTML);
    })
    return tagsArray;
}