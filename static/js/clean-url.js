// Clean URL - Remove .html from address bar
(function() {
    const path = window.location.pathname;
    if (path.endsWith('.html')) {
        const cleanPath = path.replace('.html', '');
        window.history.replaceState(null, '', cleanPath);
    }
})();
