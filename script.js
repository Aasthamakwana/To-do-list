const taskInput = document.querySelector(".task-input input"),
filters = document.querySelectorAll(".filters span"),
clearAll = document.querySelector(".clear-btn"),
taskBox = document.querySelector(".task-box");

let editId;
let isEditedTask = false;

//getting ls tl
let todos = JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    })
})

function showTodo(filter) {
    let li = "";
    if (todos) {
        todos.forEach((todo, id) => {

            //not changing on refresh
            let isCompleted = todo.status == "completed" ? "checked" : "";

            if(filter == todo.status || filter == "all"){
                li += `<li class="task">
                <label for="${id}">
                        <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                        <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="fa fa-ellipsis-h"></i>
                    <ul class="task-menu">
                        <li> <i onclick="editTask(${id}, '${todo.name}')" class="fa fa-pencil"> Edit</i></li>
                        <li> <i onclick="deleteTask(${id})" class="fa fa-trash"> Delete</i></li>
                    </ul>
                </div>
            </li>`
            }  
        });
    }
    taskBox.innerHTML = li || `<span style="color:grey; margin:40px;">You don't have any tasks here</span>`;
}

showTodo("all");

function showMenu(selectedTask){
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != selectedTask){
            taskMenu.classList.remove("show");
        }
    });
}

function editTask(taskId, taskName){
    editId = taskId;
    isEditedTask = true;
    taskInput.value = taskName;
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}

clearAll.addEventListener("click",()=>{
    todos.splice(0, todos.length);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
})

function updateStatus(selectedTask){
    let taskname = selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskname.classList.add("checked");
        todos[selectedTask.id].status = "completed";
    } else{
        taskname.classList.remove("checked");
        todos[selectedTask.id].status = "pending";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}


taskInput.addEventListener("keyup", e => {
    let userTask = taskInput.value.trim();
    if (e.key == "Enter" && userTask) {
        if(!isEditedTask){//id editedTask not true
            if(!todos) { //empty array to todos
                todos = [];
        }
        let taskInfo = { name: userTask, status: "pending" };
        todos.push(taskInfo); //adding new 
        }else{
            todos[editId].name = userTask;
            isEditedTask = false;
        }

        taskInput.value = "";
        
        localStorage.setItem("todo-list", JSON.stringify(todos));
    }
    showTodo("all");
});



function myFunction() {
    let userTask = taskInput.value.trim();
    taskInput.value = "";
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo("all");
}



