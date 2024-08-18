




const Createtodos = () => {
    

    let todos = {}




function addTodoToProject(projectId, todoItem) {
    if (!todos[projectId]) {
        todos[projectId] = [];
    }
    todoItem.id = Date.now().toString();
    todos[projectId].push(todoItem);
    saveTodosToStorage(); // save to storage
}

function getTodosForProject(projectId) {
    return todos[projectId] || [];
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

function removeTodoFromProject(projectId, todoId) {
    if (!todos[projectId]) return;

    todos[projectId] = todos[projectId].filter(todo => todo.id !== todoId);
    saveTodosToStorage();
    if (todos[projectId].length === 0) {
        delete todos[projectId];
        console.log(`Removing empty project ${projectId}`);
        saveTodosToStorage();
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

    function openTodoForm(projectId) {
        const form = document.querySelector('.todo-info');
        if (form) {
            form.dataset.projectId = projectId;
        }
        const dialog = document.querySelector(".add-todo-dialog");
        if (dialog) {
            dialog.showModal();
        } 
    }

    function toggleTodoState(todoElement) {
        if (todoElement.classList.contains('minimized')) {
            todoElement.classList.remove('minimized');
            todoElement.classList.add('expanded');
        } else {
            todoElement.classList.remove('expanded');
            todoElement.classList.add('minimized');
        }
    }

    return{
        addTodoToProject,
        getTodosForProject,
        saveTodosToStorage,
        loadTodosFromStorage,
        addTodoItem,
        openTodoForm,
        removeTodoFromProject,
        toggleTodoState
    }


}


export default Createtodos;