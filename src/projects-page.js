import Createproject from './create-project.js';
import Todopage from './todo-page.js'
import Createtodo from './create-todo.js';
import { clearContent } from './clear-content.js';
import { saveProjects } from "./json";
import { loadProjects } from "./json";

const Projectspage = () => {


    const createProject = Createproject()

    const loadUserProjects = () => {
        createProject.createProjectPage();
    }

    const createTodo = Createtodo()





    const submitProject = document.querySelector('.submit-project-btn');
    submitProject.addEventListener("click", (event) => {
        event.preventDefault();
        
    
        const projectNameInput = document.querySelector('.project-input');
    
        const projectName = projectNameInput.value.trim();
    
        
        if (projectName) {
            createProject.addProject(projectName);
            const closeProjectDialog = document.querySelector('.add-project-dialog');
            if (closeProjectDialog) {
                closeProjectDialog.close();
            }

            setTimeout(() => {
                projectNameInput.value = "";
            }, 100);
        }
        
    });

    const submitTodoProject = document.querySelector('.submit-todo-btn');
    submitTodoProject.addEventListener("click", (event) => {
        const closeTodoDialog = document.querySelector('.add-todo-dialog');
        if (closeTodoDialog) {
            closeTodoDialog.close();
        }
    })


    function closeProjectDialog() {
        const closeProjectDialogBtn = document.querySelector('.add-project-dialog');
        if (closeProjectDialogBtn) {
            closeProjectDialogBtn.close();
    
            
            const projectNameInput = document.querySelector('.project-input');
            if (projectNameInput) {
                projectNameInput.value = "";
            }
        }
    }
    



    function closeTodoDialog() {
        const closeTodoDialogBtn = document.querySelector('.add-todo-dialog');
        if (closeTodoDialogBtn) {
            closeTodoDialogBtn.close();
    
            const todoTitleInput = document.querySelector('.title')
            const todoDescriptionInput = document.querySelector('.description');
            const todoDueDateInput = document.querySelector('.due-date')
            const todoPriorityInput = document.querySelector('.priority')



            if (todoTitleInput) {
                todoTitleInput.value = "";
            }
            if (todoDescriptionInput) {
                todoDescriptionInput.value = "";
            }
            if ( todoDueDateInput) {
                todoDueDateInput.value = "";
            }
            if (todoPriorityInput) {
                todoPriorityInput.value = "";
            }
        }
    }
    
    const closeTodoDialogBtn = document.querySelector('.close-dialog-btn')
    closeTodoDialogBtn.addEventListener('click', closeTodoDialog);
    
    const closeDialog = document.querySelector('.close-project-dialog-btn')
    closeDialog.addEventListener('click', closeProjectDialog);


    loadProjects();
    loadUserProjects();

    return{
        closeProjectDialog,
        closeTodoDialog,
    }

};

export default Projectspage;