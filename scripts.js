fetch('https://portfolio-backend-api-nwhk.onrender.com/certificates')
    .then(response => response.json())
    .then(data => displayCertificates(data))
    .catch(error => console.error('Error fetching certificates:', error));

function displayCertificates(certificates) {
    const container = document.getElementById('certificates-container');
    certificates.reverse().forEach((certificate, index) => {
        const certDiv = document.createElement('div');
        certDiv.className = 'certificate';
        certDiv.innerHTML = `
            <img src="${certificate.imageUrl}" alt="${certificate.title}" style="width:100%">
            <h3>${certificate.title}</h3>
            <p>${certificate.description}</p>
        `;
        container.appendChild(certDiv);
    });
}
