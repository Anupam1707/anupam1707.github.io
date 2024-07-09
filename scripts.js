fetch('https://portfolio-backend-api-nwhk.onrender.com/certificates')
    .then(response => response.json())
    .then(data => displayCertificates(data))
    .catch(error => console.error('Error fetching certificates:', error));

function displayCertificates(certificates) {
    const container = document.getElementById('certificates-container');
    container.innerHTML = ''; // Clear the container first
    for (let i = certificates.length - 1; i >= 0; i--) {
        const certificate = certificates[i];
        const certDiv = document.createElement('div');
        certDiv.className = 'certificate';
        certDiv.innerHTML = `
            <img src="${certificate.imageUrl}" alt="${certificate.title}" style="width:100%">
            <h3>${certificate.title}</h3>
            <p>${certificate.description}</p>
        `;
        container.appendChild(certDiv);
    }
}
