document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'v')) {
        event.preventDefault();
        alert('Copy and paste are disabled on this webpage.');
    }
});

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    alert('Right-click is disabled on this webpage.');
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || (event.ctrlKey && event.shiftKey && event.key === 'I')) {
        event.preventDefault();
        alert('Opening developer tools is disabled.');
    }
});

document.addEventListener('copy', function(event) {
    event.preventDefault();
    alert('Copying content is disabled.');
});

document.addEventListener('dragstart', function(event) {
    event.preventDefault();
    alert('Dragging elements is disabled.')
});
