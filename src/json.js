
export function loadProjects() {
    const projects = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('project-')) {
            const project = JSON.parse(localStorage.getItem(key));
            projects.push({ id: key, ...project });
        }
    }
    return projects;
}

export function saveProjects(projects) {
    projects.forEach(project => {
        const { id, name } = project;
        localStorage.setItem(id, JSON.stringify({ name }));
    });
}

export function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

export function loadTodos() {
    return JSON.parse(localStorage.getItem('todos')) || {};
}