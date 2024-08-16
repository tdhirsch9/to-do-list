import './styles.css';
import Homepage from './home-page.js';
import Projectspage from './projects-page.js';
import './todo-page.js';
import './create-todo.js';
import { clearContent } from './clear-content.js';





const Webpage = (() => {



    const loadHomePage = () => {
        clearContent();
        Homepage();
    };

    const loadProjectsPage = () => {
        clearContent();
        Projectspage();
    }



    const setupEventListeners = () => {

        const homeBtn = document.querySelector(".home-btn")
        const viewProjectsBtn = document.querySelector(".view-projects-btn")
    


        homeBtn.addEventListener("click", loadHomePage);
        viewProjectsBtn.addEventListener("click", loadProjectsPage);
       

    }

    const start = () => {
        setupEventListeners()
        loadHomePage()
    }

    start()


    return {
        clearContent,
        loadHomePage,
        loadProjectsPage,
        setupEventListeners,
    };



})()

export default Webpage;