import { saveProjects, loadProjects, loadTodos, saveTodos } from './json.js';
import CreateTodos from './create-todo.js';
import { format } from 'date-fns';
import { parse } from 'date-fns';

const Createproject = () =>{

    const contentContainer = document.querySelector('.main-content');

    let projectList;
    let projectsContainer;

    const createTodo = CreateTodos()

    document.querySelector('.todo-info').addEventListener('submit', function(event) {
        event.preventDefault();
    
        
        
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        
        

        const projectId = this.dataset.projectId;

        
        const todoItem = { title, description, dueDate, priority };

        
        
        createTodo.addTodoToProject(projectId, todoItem);
    


        
        appendTodoToUI(projectId, todoItem);
    
        setTimeout(() => {
            document.querySelector('.todo-info').reset();
        }, 100);
        
    });

    function appendTodoToUI(projectId, todoItem, todoId) {
        console.log('Appending Todo:', todoItem, 'to Project ID:', projectId);
        const projectWrapper = document.querySelector(`.project-wrapper[data-project-id="${projectId}"]`);

        if (!projectWrapper) {
            console.error(`No project wrapper found with ID: ${projectId}`);
            return; // Exit the function if projectWrapper is null
        }

    let todoList = projectWrapper.querySelector('.todo-list');
    if (!todoList) {
        todoList = document.createElement('ul');
        todoList.classList.add('todo-list');
        projectWrapper.appendChild(todoList);
    }

    // Check if the todo already exists
    const existingTodos = todoList.querySelectorAll('.todo-title');
    const existingTitles = Array.from(existingTodos).map(item => item.textContent);
    if (existingTitles.includes(todoItem.title)) {
        window.alert('A todo with this title already exists. Please use a different title.');
        return; // Skip appending if the todo item already exists
    }

            const todoItemElement = document.createElement('div');
            todoItemElement.dataset.todoId = todoId;
            todoItemElement.classList.add('todo-item');
            todoItemElement.classList.add('minimized')

            const listItemTitle = document.createElement('li');
            listItemTitle.textContent = `${todoItem.title}`;
            listItemTitle.classList.add("todo-title")
            todoItemElement.appendChild(listItemTitle);

            const listItemDescription = document.createElement('li');
            listItemDescription.textContent = `${todoItem.description}`
            todoItemElement.appendChild(listItemDescription);

            const listItemDueDate = document.createElement('li');
            listItemDueDate.classList.add("formatted-date");
        
            const formattedDate = format(new Date(todoItem.dueDate), 'MM/dd/yyyy');

            listItemDueDate.textContent = `${formattedDate}`;
            todoItemElement.appendChild(listItemDueDate);

            const listItemPriority = document.createElement('li');
            listItemPriority.textContent = `${todoItem.priority}`;
            todoItemElement.appendChild(listItemPriority);

            const removeTodoBtn = document.createElement("button");
            removeTodoBtn.classList.add("remove-todo-btn");
            removeTodoBtn.textContent = "Remove To-do";
            todoItemElement.appendChild(removeTodoBtn);
    
            const toggleTodoBtn = document.createElement("button")
            toggleTodoBtn.classList.add("toggle-todo-btn-expand")
            toggleTodoBtn.textContent = "+"
            todoItemElement.appendChild(toggleTodoBtn)

            toggleTodoBtn.addEventListener('click', (event) => {
                const todoElement = event.target.closest('.todo-item');
                if (todoElement) {
                    createTodo.toggleTodoState(todoElement);
                }
            });
             
            removeTodoBtn.addEventListener("click", () => {
                const todoId = todoItemElement.dataset.todoId;
                todoItemElement.remove();
                createTodo.removeTodoFromProject(projectId, todoItem.id); /// Pass the todoId and projectId
            });
            todoList.appendChild(todoItemElement);

            return toggleTodoBtn;
            
    }
    


    const projects = document.querySelectorAll('.project-wrapper');
        
    projects.forEach(project => {
        const projectId = project.dataset.projectId;
        const todos = getTodosForProject(projectId);

        

        todos.forEach(todoItem => {
            appendTodoToUI(projectId, todoItem);
        });
    });


    
    loadTodosFromStorage();

    const createProjectPage = () => {


        
        const projectsTitle = document.createElement("h2")
        projectsTitle.classList.add("projects-title")
        projectsTitle.textContent = "My Projects"
        contentContainer.appendChild(projectsTitle)

        projectsContainer = document.createElement("div")
        projectsContainer.classList.add("projects-container")

        contentContainer.appendChild(projectsContainer)


        const addProjectBtn = document.createElement("button");
        addProjectBtn.classList.add("add-project-btn");
        addProjectBtn.textContent = "Add Project";
        projectsContainer.appendChild(addProjectBtn);

        addProjectBtn.addEventListener('click', openProjectForm);
    




        

        const savedProjects = loadProjects();
        if (savedProjects.length === 0) {
            addDefaultProject();
        } else {
            loadProjectsFromStorage()
        }

        loadTodos();
        loadTodosFromStorage()



}

    function addDefaultProject(projectName = "Start a Project", uniqueId = `project-${Date.now()}`) {
        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-wrapper");
        projectWrapper.dataset.projectId = uniqueId;

        const projectTitle = document.createElement("button");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = projectName;

        projectTitle.addEventListener("click", () => openTodoForm(uniqueId));
        projectWrapper.appendChild(projectTitle);

        projectsContainer.appendChild(projectWrapper);

        const addProjectBtn = document.querySelector(".add-project-btn");

        projectWrapper.classList.add("project-wrapper");


        
        projectsContainer.insertBefore(projectWrapper, addProjectBtn);


        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("remove-btn");
        removeProjectBtn.textContent = "Remove";
        projectWrapper.appendChild(removeProjectBtn);

        removeProjectBtn.addEventListener("click", () => {
            projectsContainer.removeChild(projectWrapper);
            localStorage.removeItem(projectWrapper.dataset.projectId)
            saveProjectsToStorage();
        });
        saveProjectsToStorage();
    }

    function addProject(projectName, uniqueId = `project-${Date.now()}`) {
    
    
        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-wrapper");
        projectWrapper.dataset.projectId = uniqueId
        projectWrapper.dataset.projectName = projectName;

        const projectTitle = document.createElement("button");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = projectName;
        projectWrapper.appendChild(projectTitle);

        projectTitle.addEventListener("click", () => {
            openTodoForm(uniqueId);
        });

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("remove-btn");
        removeProjectBtn.textContent = "Remove";
        projectWrapper.appendChild(removeProjectBtn);


        projectsContainer.appendChild(projectWrapper);

        removeProjectBtn.addEventListener("click", () => {
            projectsContainer.removeChild(projectWrapper);
            localStorage.removeItem(projectWrapper.dataset.projectId)
        });

        const addProjectBtn = document.querySelector(".add-project-btn");
        if (projectsContainer.contains(addProjectBtn)) {
            projectsContainer.insertBefore(projectWrapper, addProjectBtn);
        }   else {
            projectsContainer.appendChild(projectWrapper); 
        }

        saveProjectsToStorage();
    }


    function openProjectForm(){
        const dialog = document.querySelector(".add-project-dialog");
        if (dialog) {
            dialog.showModal();
        } 
    }

    function openTodoForm(projectId){
        const form = document.querySelector('.todo-info');
        if (form) {
            form.dataset.projectId = projectId; // Set the project identifier on the form
        }
        const dialog = document.querySelector(".add-todo-dialog");
        if (dialog) {
            dialog.showModal();
        } 
    }

    function loadProjectsFromStorage() {
        const savedProjects = loadProjects();
        savedProjects.forEach(project => {
            if (!document.querySelector(`.project-wrapper[data-project-id="${project.id}"]`)) {
                addProject(project.name, project.id);
            }
        });
    }

    function loadTodosFromStorage() {
        const savedTodos = loadTodos();
        const todosString = localStorage.getItem('todos');
        
        
        const projects = document.querySelectorAll('.project-wrapper');
    
        projects.forEach(project => {
            const projectId = project.dataset.projectId;
            const todoList = project.querySelector('.todo-list') || document.createElement('ul');
            if (!todoList) {
                todoList = document.createElement('ul');
                todoList.classList.add('todo-list');
                project.appendChild(todoList);
                
            } 
    
            const todosForProject = savedTodos[projectId] || [];
            todosForProject.forEach(todoItem => {
                appendTodoToUI(projectId, todoItem);
            });
        });
    }
    

    function saveProjectsToStorage() {
        
        const projects  = [];
        const projectWrappers = document.querySelectorAll(".project-wrapper");
        projectWrappers.forEach(wrapper => {
            const projectId = wrapper.dataset.projectId;
            const projectName = wrapper.querySelector(".project-title").textContent;
            projects.push({ id: projectId, name: projectName });
        });

        
        saveProjects(projects);
    }

    function saveTodosToStorage() {
        const todos = {};
    
        const projectWrappers = document.querySelectorAll('.project-wrapper');
        projectWrappers.forEach(wrapper => {
            const projectId = wrapper.dataset.projectId;
            const todoItems = [];

            
    
            wrapper.querySelectorAll('.todo-list').forEach(todoList => {
                todoList.querySelectorAll('li').forEach(listItem => {
                    const todoItem = {
                        title: listItem.querySelector('.todo-title')?.textContent || '',
                        description: listItem.querySelector('.todo-description')?.textContent || '',
                        dueDate: listItem.querySelector('.formatted-date')?.textContent || '',
                        priority: listItem.querySelector('.todo-priority')?.textContent || ''
                    };
                    // Check if the todoItem has non-empty fields
                    if (todoItem.title || todoItem.description || todoItem.dueDate || todoItem.priority) {
                        todoItems.push(todoItem);
                    }
                });
            });
    
            

            if (todoItems.length > 0) {
                todos[projectId] = todoItems;
            }
        });
    
        if (Object.keys(todos).length === 0) {
            localStorage.removeItem('todos');
        } else {
            saveTodos(todos);
        }
    }
    
    

    return{
        openProjectForm,
        createProjectPage,
        addProject
    }

}

export default Createproject;