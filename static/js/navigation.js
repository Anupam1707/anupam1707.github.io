// Active navigation state management
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'home.html';
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === 'index.html' && href === 'home.html')) {
            link.classList.add('active');
        }
        
        // Add smooth scroll behavior for internal links
        link.addEventListener('click', function(e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('header');

if (header) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.style.boxShadow = 'none';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
        
        lastScroll = currentScroll;
    });
}
