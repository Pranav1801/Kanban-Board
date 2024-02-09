window.onload = () => {
    fetchTasks();
}

const tasksJSON = localStorage.getItem('tasks_json');
var temp,tempTime;

const fetchTasks = () =>{
    const todoTasks = document.querySelector('#todo-tasks');
    const inProgressTasks = document.querySelector('#in-progress-tasks');
    const doneTasks = document.querySelector('#done-tasks');

    if(tasksJSON == null){
        const emptyText = document.createElement('label');
        emptyText.classList.add('empty-state');
        emptyText.innerHTML = 'No task present';
        todoTasks.appendChild(emptyText);
        inProgressTasks.appendChild(emptyText.cloneNode(true));
        doneTasks.appendChild(emptyText.cloneNode(true));
    } else {

        JSON.parse(tasksJSON).forEach(task => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.id = task.id;
            card.draggable = true;
            // attach the dragstart event handler
            card.addEventListener('dragstart', dragStart);
            tempTime = task.created;
            // card.ondragstart = dragStart(this);




            const titleDiv = document.createElement('div');
            titleDiv.style.display = "flex";
            titleDiv.style.flexDirection = "row";
            titleDiv.style.justifyContent = "space-between";
            titleDiv.style.paddingBottom = '10px';

            const title = document.createElement('label');
            title.innerHTML = task.todo;
            title.style.fontSize = "20px";
            title.style.fontWeight = 'bold';

            const editIcon = document.createElement('img');
            editIcon.src = '/assets/edit_icon.svg';

            const chipDiv = document.createElement('div');
            chipDiv.classList.add('chips');
            chipDiv.style.paddingBottom = "10px";
            
            if(task.tags != ""){
                task.tags.forEach(tag =>{
                    const chip = getTags(tag)
                    chipDiv.append(chip);
                })
            }

            const desc = document.createElement('label');
            desc.innerHTML = task.description.slice(0,30) + "...";
            const descLink = document.createElement('a');
            descLink.innerHTML = " Read More";
            descLink.href = "/views/edit.html?timestamp=" + task.created;
            descLink.style.color = "blue"

            desc.appendChild(descLink);

            const footerDiv = document.createElement('div');
            footerDiv.style.display = "flex";
            footerDiv.style.flexDirection = "row";
            footerDiv.style.justifyContent = "space-between";
            footerDiv.style.paddingTop = "30px"

            const time = new Date(task.created);
            const createTime = document.createElement('label');
            createTime.innerHTML = "Created At: " + time.toLocaleDateString() + " " + time.toLocaleTimeString();
            createTime.style.fontSize = "15px";

            const update = new Date(task.updated);
            const updateTime = document.createElement('label');
            updateTime.innerHTML = "Updated At: " + update.toLocaleDateString() + " " + update.toLocaleTimeString();
            updateTime.style.fontSize = "15px";

            titleDiv.appendChild(title);
            titleDiv.appendChild(editIcon);

            footerDiv.appendChild(createTime);
            footerDiv.appendChild(updateTime);

            card.appendChild(titleDiv);
            card.appendChild(chipDiv);
            card.appendChild(desc);
            card.appendChild(footerDiv);


            // inProgressTasks.addEventListener("dragover", dragOver)
            // inProgressTasks.addEventListener("drop", drop)

            if(task.status == "Todo") todoTasks.appendChild(card);
            else if(task.status == "In Progress") {
                card.style.backgroundColor = "#584666";
                inProgressTasks.appendChild(card);
                titleDiv.removeChild(editIcon);
            } else if(task.status == "Done") {
                card.style.backgroundColor = "#4E6646";
                doneTasks.appendChild(card)
                titleDiv.removeChild(editIcon);
            }

            editIcon.addEventListener("click", function(){ 
                window.open("/views/edit.html?timestamp="+task.created, "_self");
            });
        })

    }
}

const getTags = (inputValue) => {
    var chip = document.createElement('div');
    chip.classList.add('chip');
    chip.style.backgroundColor = generateRandomColor();
    chip.style.height = '30px';

    var chip_text = document.createElement('span');
    chip_text.classList.add('chip--text');
    chip_text.innerHTML = inputValue;

    var chip_button = document.createElement('span');
    chip_button.classList.add('chip--button');
    chip_button.innerHTML = 'X';
    
    chip.appendChild(chip_text);
    generateRandomColor();
    return chip;
}

const generateRandomColor = () => {
    const chipColors = ['#59BEDE', '#C4DE59']
    const temp = chipColors[Math.floor(Math.random() * 2)];
    return temp;
}

// handle the dragstart
function dragStart(e) {
    // e.dataTransfer.clearData();3
    // var id = 'drag-'+(new Date()).getTime();
    // e.target.id = id;
  
    // temp = e.target;
    // tempTime = e.target.childNodes[3];
    e.dataTransfer.setData('text/plain', e.target.id);
    console.log("dfgbhnjmdcfvgbhnj", e.target);
    // e
    //   .currentTarget
    //   .classList.add('card');
    console.log('drag starts...');
}
  

const boxes = document.querySelectorAll('.dropzone');

boxes.forEach(box => {
    box.addEventListener('dragenter', dragEnter)
    box.addEventListener('dragover', dragOver);
    box.addEventListener('dragleave', dragLeave);
    box.addEventListener('drop', drop);
});


function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave(e) {

}

function drop(e) {
  // get the draggable element
  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);
  const dropzone = e.target;
  dropzone.append(draggable);

  console.log("fskms", id);
//   console.log("fskms", e);
  console.log("dfgbhnjmdcfvgbhnj", draggable);
//   console.log("dfgbhnjmdcfvgbhnj", tempTime);
//   console.log("fskms", e.target.id);
  // add it to the drop target
  // e.target.append(draggable);

  changeColor(dropzone.id, id);
  updateStatus(dropzone.id, id);
}



const changeColor = (dropedtasktag, dropedtaskid) => {
    const card = document.getElementById(dropedtaskid);
    console.log("card", card);
    if(dropedtasktag == "in-progress-tasks") {
        card.style.backgroundColor = "#584666";
    }
    else if(dropedtasktag == "done-tasks") {
        card.style.backgroundColor = "#4E6646";
    }
}

const updateStatus = (dropedtasktag, dropedtaskid) =>{
    var tasks = JSON.parse(tasksJSON);
    for (var i = 0; i < tasks.length; i++) {
            if(dropedtaskid === tasks[i].id){
                if(dropedtasktag == "in-progress-tasks"){
                    tasks[i].status = "In Progress";
                    break;  
                }
                else if(dropedtasktag == "done-tasks"){

                    tasks[i].status = "Done";
                    break;  
                }
            }
        console.log("tasks", tasks);
    }
  localStorage.setItem('tasks_json', JSON.stringify(tasks));
  location.reload();
}