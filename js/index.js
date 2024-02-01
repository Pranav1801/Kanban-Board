const fetchTasks = () =>{
    const tasksJSON = localStorage.getItem('tasks_json');
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
        // tasks.appendChild(emptyText.cloneNode(true));
        // tasks.appendChild(emptyText.cloneNode(true));
    } else {

        JSON.parse(tasksJSON).forEach(task => {
            const card = document.createElement('div');
            card.classList.add('card');

            const titleDiv = document.createElement('div');
            titleDiv.style.display = "flex";
            titleDiv.style.flexDirection = "row";
            titleDiv.style.justifyContent = "space-between";

    
            const title = document.createElement('label');
            title.innerHTML = task.todo;
            title.style.fontSize = "30px";

            const editIcon = document.createElement('img');
            editIcon.src = '/assets/edit_icon.svg';

            const desc = document.createElement('label');
            desc.innerHTML = task.description;

            const createTime = document.createElement('label');
            const time = new Date(task.created);
            createTime.innerHTML = time.toLocaleDateString() + " " + time.toLocaleTimeString();

            titleDiv.appendChild(title);
            titleDiv.appendChild(editIcon);


            card.appendChild(titleDiv);
            card.appendChild(desc);
            card.appendChild(createTime);

            if(task.status == "Todo") todoTasks.appendChild(card);

            editIcon.addEventListener("click", function(){ 
                window.open("/views/edit.html?timestamp="+task.created, "_self");
            });
        })

    }
}


fetchTasks();