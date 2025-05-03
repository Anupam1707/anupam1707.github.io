document.addEventListener('DOMContentLoaded', function() {
    const loadingIndicator = document.getElementById('loading');
    const container = document.getElementById('certificates-container');
    const sortSelect = document.getElementById('sort-select');

    function fetchCerts() {
        fetch(`https://portfolio-backend-api-nwhk.onrender.com/certificates?api_key=${ip}`)
            .then(response => response.json())
            .then(certificates => {
                const sortedData = sortCertificatesByDate(certificates);
                displayCertificates(sortedData);
                loadingIndicator.style.display = 'none';
            })  
            .catch(error => {
                console.error('Error fetching certificates:', error);
                loadingIndicator.innerText = 'Failed to load certificates.';
            });
    }
    
    function sortCertificatesByDate(certificates) {
        const sortOrder = sortSelect.value;
        console.log('Sorting certificates by date:', sortOrder);
        const sorted = certificates.sort((a, b) => {
            return sortOrder === 'latest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
        });
        console.log('Certificates after sorting:', sorted);
        return sorted;
    }

    function displayCertificates(certificates) {
        container.innerHTML = '';
        certificates.forEach(certificate => {
            const certDiv = document.createElement('div');
            certDiv.className = 'certificate';
            certDiv.innerHTML = `
                <img src="${certificate.imageUrl}" alt="${certificate.title}" style="width:100%">
                <h2>${certificate.title}</h2>
                <p>${certificate.description}</p>
            `;
            container.append(certDiv);
        });
    }

    let ip;
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        ip = data.ip;
      })
      .catch(error => console.error('Error fetching IP:', error));

    fetchCerts();
    sortSelect.addEventListener('change', fetchCerts);
});
