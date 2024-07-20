document.addEventListener('DOMContentLoaded', function() {
    const loadingIndicator = document.getElementById('loading');
    const container = document.getElementById('certificates-container');

    fetch('https://portfolio-backend-api-nwhk.onrender.com/certificates')
        .then(response => response.json())
        .then(data => {
            displayCertificates(data);
            loadingIndicator.style.display = 'none';
        })  
        .catch(error => {
            console.error('Error fetching certificates:', error);
            loadingIndicator.innerText = 'Failed to load certificates.';
        })

    function displayCertificates(certificates) {
        container.innerHTML = ''; // Clear the container first
        for (let i = certificates.length - 1; i >= 0; i--) {
            const certificate = certificates[i];
            const certDiv = document.createElement('div');
            certDiv.className = 'certificate';
            certDiv.innerHTML = `
                <img src="${certificate.imageUrl}" alt="${certificate.title}" style="width:100%">
                <h2>${certificate.title}</h2>
                <p>${certificate.description}</p>
            `;
            container.appendChild(certDiv);
        }
    }
});
