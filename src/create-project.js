import { saveProjects, loadProjects } from './json.js';
import CreateTodos from './create-todo.js';
import { format } from 'date-fns';

const Createproject = () =>{

    const contentContainer = document.querySelector('.main-content');

    let projectList;
    let projectsContainer;

    const createTodo = CreateTodos()

    document.querySelector('.todo-info').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
    
        // Capture the form data
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due-date').value;
        const priority = document.getElementById('priority').value;
        console.log(priority)
        
        const projectName = this.dataset.projectName;

        // Create the todo item object
        const todoItem = { title, description, dueDate, priority };

        
        // Use the function from the todo.js module
        createTodo.addTodoToProject(projectName, todoItem);
    
        console.log(todoItem)

        // Update the UI
        appendTodoToUI(projectName, todoItem);
    
        // Clear form inputs
        document.querySelector('.todo-info').reset();
    });

    function appendTodoToUI(projectName, todoItem) {
      
        const projectWrapper = document.querySelector(`.project-wrapper[data-project-name="${projectName}"]`);

            let todoList = document.createElement('ul');
            todoList.classList.add('todo-list');
            projectWrapper.appendChild(todoList);

            const listItemTitle = document.createElement('li');
            listItemTitle.textContent = `To-do Item: ${todoItem.title}`;
            listItemTitle.classList.add("todo-title")
            todoList.appendChild(listItemTitle);

            const listItemDescription = document.createElement('li');
            listItemDescription.textContent = `${todoItem.description}`
            todoList.appendChild(listItemDescription);

            const listItemDueDate = document.createElement('li');
            listItemDueDate.classList.add("formatted-date");
        
   
            const formattedDate = format(new Date(todoItem.dueDate), 'MM/dd/yyyy');
            listItemDueDate.textContent = `Due: ${formattedDate}`;
            todoList.appendChild(listItemDueDate);

            const listItemPriority = document.createElement('li');
            listItemPriority.textContent = `Priority: ${todoItem.priority}`;
            todoList.appendChild(listItemPriority);

            const removeTodoBtn = document.createElement("button");
            removeTodoBtn.classList.add("remove-todo-btn");
            removeTodoBtn.textContent = "Remove To-do";
            todoList.appendChild(removeTodoBtn);
    
            removeTodoBtn.addEventListener("click", () => {
                projectWrapper.removeChild(todoList);
                saveProjectsToStorage();
            });
    }
    

    document.addEventListener('DOMContentLoaded', () => {
        createTodo.loadTodosFromStorage();
        const projects = document.querySelectorAll('.project-wrapper');
        projects.forEach(project => {
            const projectName = project.dataset.projectName;
            const todos = getTodosForProject(projectName);
            todos.forEach(todoItem => {
                appendTodoToUI(projectName, todoItem);
            });
        });
    });
    


    const createProjectPage = () => {

        const projectsTitle = document.createElement("h2")
        projectsTitle.classList.add("projects-title")
        projectsTitle.textContent = "My Projects"
        contentContainer.appendChild(projectsTitle)

        projectsContainer = document.createElement("div")
        projectsContainer.classList.add("projects-container")

        contentContainer.appendChild(projectsContainer)

        const addProjectBtn = document.createElement("button");
        addProjectBtn.classList.add("add-project-btn")
        addProjectBtn.textContent = "Add Project"
        projectsContainer.appendChild(addProjectBtn)




        addProjectBtn.addEventListener('click', openProjectForm);

        const savedProjects = loadProjects();
        if (savedProjects.length === 0) {
            addDefaultProject();
        } else {
            loadProjectsFromStorage()
        }




}

    function addDefaultProject() {
        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-wrapper");

        const projectTitle = document.createElement("button");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = "Start a Project";
        projectTitle.addEventListener("click", () => createTodo.openTodoForm);
        projectWrapper.appendChild(projectTitle);

        projectsContainer.appendChild(projectWrapper);
        projectsContainer.insertBefore(document.querySelector(".add-project-btn"));

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("remove-btn");
        removeProjectBtn.textContent = "Remove";
        projectWrapper.appendChild(removeProjectBtn);

        removeProjectBtn.addEventListener("click", () => {
            projectsContainer.removeChild(projectWrapper);
            saveProjectsToStorage();
        });
    }

    function addProject(projectName) {
        
        const projectWrapper = document.createElement("div");
        projectWrapper.classList.add("project-wrapper");

        projectWrapper.dataset.projectName = projectName;

        const projectTitle = document.createElement("button");
        projectTitle.classList.add("project-title");
        projectTitle.textContent = projectName;
        projectWrapper.appendChild(projectTitle);

        projectTitle.addEventListener("click", () => {
            createTodo.addTodoToProject(openTodoForm(projectName));
        });

        const removeProjectBtn = document.createElement("button");
        removeProjectBtn.classList.add("remove-btn");
        removeProjectBtn.textContent = "Remove";
        projectWrapper.appendChild(removeProjectBtn);


        projectsContainer.appendChild(projectWrapper);

        removeProjectBtn.addEventListener("click", () => {
            projectsContainer.removeChild(projectWrapper);
            saveProjectsToStorage();
        });

        const addProjectBtn = document.querySelector(".add-project-btn");
        if (projectsContainer.contains(addProjectBtn)) {
            projectsContainer.insertBefore(projectWrapper, addProjectBtn);
        }   else {
            projectsContainer.appendChild(projectWrapper); 
        }

        saveProjectsToStorage();
    }

    function maintainProjectList(){
        if(!projectList){
            projectList = document.createElement("ul")
            projectList.classList.add("todo-list")
            contentContainer.appendChild(projectList)
        }
    }

    function openProjectForm(){
        const dialog = document.querySelector(".add-project-dialog");
        if (dialog) {
            dialog.showModal();
        } 
    }

    function openTodoForm(projectName){
        const form = document.querySelector('.todo-info');
        if (form) {
            form.dataset.projectName = projectName; // Set the project identifier on the form
            console.log(`Form project name set to: ${form.dataset.projectName}`);
        }
        const dialog = document.querySelector(".add-todo-dialog");
        if (dialog) {
            dialog.showModal();
        } 
    }

    function loadProjectsFromStorage() {
        const savedProjects = loadProjects();
        savedProjects.forEach(projectName => {
            addProject(projectName);
        });
    }

    

    function saveProjectsToStorage() {
        const projects = [];
        const projectWrappers = document.querySelectorAll(".project-wrapper");
        projectWrappers.forEach(wrapper => {
            const projectName = wrapper.querySelector(".project-title").textContent;
            projects.push(projectName);
        });
        saveProjects(projects);
    }

    return{
        maintainProjectList,
        openProjectForm,
        createProjectPage,
        addProject
    }

}

export default Createproject;