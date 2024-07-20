document.addEventListener('DOMContentLoaded', function() {
    const loadingIndicator = document.getElementById('loading');
    const container = document.getElementById('certificates-container');

    fetch('https://portfolio-backend-api-nwhk.onrender.com/certificates')
        .then(response => response.json())
        .then(data => {
            const sortedData = sortCertificatesByDate(data);
            displayCertificates(sortedData);
            loadingIndicator.style.display = 'none';
        })  
        .catch(error => {
            console.error('Error fetching certificates:', error);
            loadingIndicator.innerText = 'Failed to load certificates.';
        });

    function sortCertificatesByDate(certificates) {
        return certificates.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    function displayCertificates(certificates) {
        container.innerHTML = ''; // Clear the container first
        certificates.forEach(certificate => {
            const certDiv = document.createElement('div');
            certDiv.className = 'certificate';
            certDiv.innerHTML = `
                <img src="${certificate.imageUrl}" alt="${certificate.title}" style="width:100%">
                <h2>${certificate.title}</h2>
                <p>${certificate.description}</p>
            `;
            container.appendChild(certDiv);
        });
    }
});
