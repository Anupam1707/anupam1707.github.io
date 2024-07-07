document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splashScreen');
  setTimeout(function() {
    splash.classList.add('hide');
    // Redirect to another page after hiding the splash screen
    window.location.href = 'home'; // Replace with your target URL
  }, 4000); // 4000 milliseconds = 4 seconds
});
