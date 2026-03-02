// Scroll Reveal - Animate elements on scroll
document.addEventListener('DOMContentLoaded', function() {
    // Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optional: stop observing after reveal
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Add scroll reveal class to sections if they don't have animation already
    const sections = document.querySelectorAll('section, .project, .blog-post, .certificate');
    sections.forEach((section, index) => {
        if (!section.style.animation && !section.classList.contains('scroll-reveal')) {
            section.classList.add('scroll-reveal');
            section.style.animationDelay = `${index * 0.1}s`;
            observer.observe(section);
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add parallax effect to background
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.pageYOffset;
                const parallaxElements = document.querySelectorAll('.role-photo, .parallax');
                
                parallaxElements.forEach(el => {
                    const speed = el.dataset.speed || 0.5;
                    const yPos = -(scrolled * speed);
                    el.style.transform = `translateY(${yPos}px)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // Add hover effect sound/visual feedback (optional)
    const interactiveElements = document.querySelectorAll('button, a, .project, .blog-post, .certificate');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Lazy load images for better performance
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const initialAnimations = document.querySelectorAll('[data-animate-on-load]');
    initialAnimations.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animated');
        }, index * 100);
    });
});

// Handle page visibility for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab is visible
        document.body.classList.remove('paused');
    }
});
