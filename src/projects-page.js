import Createproject from './create-project.js';
import Createtodo from './create-todo.js';
import { clearContent } from './clear-content.js';
import { saveProjects, loadProjects, saveTodos, loadTodos } from "./json";
import { format } from 'date-fns';
import { addProjectSubmitListener, removeProjectSubmitListener } from './eventListeners.js';

const Projectspage = () => {
    

    const createProject = Createproject()

    const loadUserProjects = () => {
        createProject.createProjectPage();
    }

    

    const createTodo = Createtodo()





    const handleProjectSubmit = (event) => {
        event.preventDefault();
        console.log('handleProjectSubmit triggered'); // Debugging line
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
    };

    const submitTodoProject = document.querySelector('.submit-todo-btn');
    submitTodoProject.addEventListener("click", (event) => {
        console.log('submitTodoProject listener triggered'); // Debugging line
        const closeTodoDialog = document.querySelector('.add-todo-dialog');
        if (closeTodoDialog) {
            closeTodoDialog.close();
        }
    })

    const submitProject = document.querySelector('.submit-project-btn');
    console.log('submitProject button:', submitProject); // Check if button is selected correctly
    addProjectSubmitListener(submitProject, handleProjectSubmit);


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