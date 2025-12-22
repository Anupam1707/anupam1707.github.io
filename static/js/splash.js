document.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splashScreen');
    
    // Create loading text
    const loadingText = document.createElement('div');
    loadingText.style.cssText = `
        position: absolute;
        bottom: 150px;
        color: #00ffff;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: 3px;
        text-transform: uppercase;
        animation: fadeInOut 2s ease-in-out infinite;
        text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
    `;
    loadingText.textContent = 'Loading Amazing Content...';
    splash.appendChild(loadingText);
    
    // Add loading bar animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
        
        @keyframes loadBar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
        
        .splash::after {
            animation: loadBar 3s ease-out forwards;
            background: linear-gradient(90deg, #00ffff, #00ff88, #00d4ff) !important;
            box-shadow: 0 0 20px rgba(0, 255, 255, 0.6) !important;
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(function() {
        splash.classList.add('hide');
        setTimeout(function() {
            window.location.href = 'home';
        }, 1000);
    }, 3000);
});
