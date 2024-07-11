document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const projectsContainer = document.getElementById('projects-container');

    fetch('https://portfolio-backend-api-nwhk.onrender.com/projects')  // Replace with your actual backend URL for projects
        .then(response => response.json())
        .then(projects => {
            displayProjects(projects);
            loadingIndicator.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching projects:', error);
            loadingIndicator.innerText = 'Failed to load projects.';
        });

    function displayProjects(projects) {
        projectsContainer.innerHTML = ''; // Clear the container first
        for (let i = projects.length - 1; i >= 0; i--) {
<<<<<<< HEAD
            const project = projects[i]; // Use `project` here instead of `certificate`
=======
            const project = projects[i];
>>>>>>> b7f58af06541113e73fd182f10b55a405bdfebdc
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title}">
                <div class="project-content">
                    <h2>${project.title}</h2>
                    <h3>${project.date}</h3>
                    <p>${project.description}</p>
                    <button onclick="window.location.href='${project.link}'">View Project</button>
                </div>
            `;
            projectsContainer.appendChild(projectElement);
        }
    }
});
