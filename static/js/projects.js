document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const projectsContainer = document.getElementById('projects-container');
    const sortSelect = document.getElementById('sort-select');

    function fetchProjs() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                const ip = data.ip;
                return fetch(`https://portfolio-backend-api-nwhk.onrender.com/projects?api_key=${ip}`);
            })
            .then(response => response.json())
            .then(projects => {
                const sortedData = sortProjectsByDate(projects);
                displayProjects(sortedData);
                loadingIndicator.style.display = 'none';
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                loadingIndicator.innerText = 'Failed to load projects.';
            });
    }

    function sortProjectsByDate(projects) {
        const sortOrder = sortSelect.value;
        console.log('Sorting projects by date:', sortOrder);
        const sorted = projects.sort((a, b) => {
        return sortOrder === 'latest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
        });
        console.log('Projects after sorting:', sorted);
        return sorted;
    }

    function displayProjects(projects) {
        projectsContainer.innerHTML = ''; // Clear the container first
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <img src="${project.imageUrl}" alt="${project.title}">
                <div class="project-content">
                    <h2>${project.title}</h2>
                    <h3>${project.dateString}</h3>
                    <p>${project.description}</p>
                    <button onclick="window.location.href='${project.link}'">View Project</button>
                </div>
            `;
            projectsContainer.append(projectElement);
        });
    }

    fetchProjs();
    sortSelect.addEventListener('change', fetchProjs);
});
