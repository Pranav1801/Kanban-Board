const title = document.getElementById("title");
const description = document.getElementById("desc");
// const tags = document.getElementById()

const create = document.getElementById("create");
const create_and_view = document.getElementById("create-and-view");


const validation = () =>{}

const createTask = () =>{
    checkTaskJson();
    location.reload();
    // document.forms['form'].reset();
    // title.innerHTML = ""
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
        tags: "",
        status: 'Todo',
        created: timestamp,
        updated: "",
    }
    tasks.push(temp);
    localStorage.setItem("tasks_json", JSON.stringify(tasks));
}






// document.getElementById('input').addEventListener('change', function () {
//     createChip(this.value);
//     this.value = '';
// });
  
// ['John', 'Peter'].forEach(createChip);
  
// function createChip(val) {
//     const el = document.createElement('li');
//     el.innerText = val;
//     document.getElementById('chips').appendChild(el);
// }