// Clean URL - Remove .html from address bar while preserving query parameters
(function() {
    // Avoid running on local file scheme to prevent browser SecurityErrors
    if (window.location.protocol === 'file:') return;

    const path = window.location.pathname;
    if (path.endsWith('.html')) {
        const cleanPath = path.replace('.html', '');
        const search = window.location.search; // Preserve query parameters
        const hash = window.location.hash; // Preserve hash
        try {
            window.history.replaceState(null, '', cleanPath + search + hash);
        } catch (e) {
            console.warn('Failed to clean URL path:', e);
        }
    }
})();
