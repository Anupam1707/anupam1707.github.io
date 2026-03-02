// Clean URL - Remove .html from address bar while preserving query parameters
(function() {
    const path = window.location.pathname;
    if (path.endsWith('.html')) {
        const cleanPath = path.replace('.html', '');
        const search = window.location.search; // Preserve query parameters
        const hash = window.location.hash; // Preserve hash
        window.history.replaceState(null, '', cleanPath + search + hash);
    }
})();
