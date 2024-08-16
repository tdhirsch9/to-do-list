




const Createtodos = () => {
    

    let todos = {}




function addTodoToProject(projectName, todoItem) {
    if (!todos[projectName]) {
        todos[projectName] = [];
    }
    todos[projectName].push(todoItem);
    saveTodosToStorage(); // Optionally save to storage
}

function getTodosForProject(projectName) {
    return todos[projectName] || [];
}

function saveTodosToStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodosFromStorage() {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos) {
        todos = savedTodos;
    }
}
    
function addTodoItem(title, description, dueDate, priority){
    return{
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
    }
    }

    function openTodoForm(){
        const dialog = document.querySelector(".add-todo-dialog");
        if (dialog) {
            dialog.showModal();
        } 
    }

    return{
        addTodoToProject,
        getTodosForProject,
        saveTodosToStorage,
        loadTodosFromStorage,
        addTodoItem,
        openTodoForm
    }


}


export default Createtodos;