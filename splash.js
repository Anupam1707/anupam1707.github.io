// JavaScript for splash screen
document.addEventListener('DOMContentLoaded', function() {
  const splash = document.getElementById('splashScreen');
  setTimeout(function() {
    splash.classList.add('hide');
  }, 4000); // 3000 milliseconds = 3 seconds
});
