// Selectors
const todoInput = document.querySelector(".todo-input")
const todoButton = document.querySelector(".todo-button")
const todoList = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")
// Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addtodo);
todoList.addEventListener('click',deletecheck);
filterOption.addEventListener('click',filterTodo); 


// Functions
function addtodo(event) {
    // Prevent form from submitting
    event.preventDefault();
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newtodo = document.createElement('li');
    // whatever user input be , it's value be stored in newtodo
    newtodo.innerHTML = todoInput.value;
    newtodo.classList.add('todo-item');
    todoDiv.appendChild(newtodo);
    // Add todo to localstorage
    saveLocalTodos(todoInput.value);
    // Check Markbutton
    const Completedbutton = document.createElement('button');
    Completedbutton.innerHTML = '<i class="fas fa-check"></i>';
    Completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(Completedbutton);
    // Check trashbutton
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);
    // Append  to list
    todoList.appendChild(todoDiv);
    todoInput.value = "";
} 

function deletecheck(e){
    // first grab the desired item
    const item = e.target;
    // Delete Todo
    // We checked whether the user clicked on the trash button or not, by using item.classList[0] === "trash-btn"
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        // transitioned which will make the function with .remove() the method in action after the transition is done.
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }

    // Check Mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        //  added the class of completed to the parent element.
        todo.classList.toggle("completed");
    }


}

function filterTodo(e){
const todos = todoList.childNodes;
todos.forEach(function(todo){
    switch(e.target.value){
        case "all":
            todo.style.display = 'flex';
            break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;

    }
})
}

function saveLocalTodos(todo){
    // check if there is anything in the local storage
    let todos;
    if(localStorage.getItem('todos') === null){
        // if doesn't have anything create an empty array
        todos = [];
    }else{
        // if have then get in array format. 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        // if doesn't have anything create an empty array
        todos = [];
    }else{
        // if have then get in array format. 
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create LI
    const newtodo = document.createElement('li');
    // whatever user input be , it's value be stored in newtodo
    newtodo.innerText = todo;
    newtodo.classList.add('todo-item');
    todoDiv.appendChild(newtodo);
    
    // Check Markbutton
    const Completedbutton = document.createElement('button');
    Completedbutton.innerHTML = '<i class="fas fa-check"></i>';
    Completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(Completedbutton);
    // Check trashbutton
    const trashbutton = document.createElement('button');
    trashbutton.innerHTML = '<i class="fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);
    // Append  to list
    todoList.appendChild(todoDiv);
    })

}

function removeLocalTodos(todo){

  let todos;
if(localStorage.getItem('todos') === null){
    // if doesn't have anything create an empty array
    todos = [];
}else{
    // if have then get in array format. 
    todos = JSON.parse(localStorage.getItem('todos'));
}
 const todoIndex = todo.children[0].innerText;
 todos.splice(todos.indexOf(todoIndex),1);
 localStorage.setItem("todos",JSON.stringify(todos));
 }