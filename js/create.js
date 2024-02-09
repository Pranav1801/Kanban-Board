const title = document.getElementById("title");
const description = document.getElementById("desc");

const create = document.getElementById("create");
const create_and_view = document.getElementById("create-and-view");

// window.onload = addChip();

const validation = () =>{
    const tags = document.querySelector(".tags");
    if(title.value == "" || description.value == "" || tags == null) {
        alert("Empty")
        return false
    }
    else return true;
}

const createTask = () =>{
    if(validation()){
        createTaskJson();
        title.value = "";
        description.value = "";
        // removeChips();
        removeTags();
    }
}

const createAndViewTask = () =>{
    if(validation()){
        createTaskJson();
        location.href = "../index.html";
    }
}

const createTaskJson = () =>{
    const tasksJSON = localStorage.getItem('tasks_json');
    const tasks = tasksJSON ? JSON.parse(tasksJSON) : [];
    const timestamp = Date.now();
    let temp = {
        id: tasks.length + 1,
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