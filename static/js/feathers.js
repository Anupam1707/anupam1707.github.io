document.addEventListener('DOMContentLoaded', function() {
    const loadingIndicator = document.getElementById('loading');
    const container = document.getElementById('certificates-container');
    const sortSelect = document.getElementById('sort-select');

    function fetchCerts() {
        fetch('https://github.pythonanywhere.com/certificates')
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

    fetchCerts();
    sortSelect.addEventListener('change', fetchCerts);
});
