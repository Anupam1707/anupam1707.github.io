document.addEventListener('DOMContentLoaded', function() {
  // Fetch roles from roles.txt
  fetch('misc/roles.txt')
      .then(response => response.text())
      .then(data => {
          // Split roles by newline or any other delimiter as per your file
          const roles = data.split('\n'); // Split by newline assuming each role is on a new line
          const element = document.getElementById('roles');
          let roleIndex = 0;
          let charIndex = 0;

          function type() {
              if (charIndex < roles[roleIndex].length) {
                  element.textContent += roles[roleIndex].charAt(charIndex);
                  charIndex++;
                  setTimeout(type, 50);
              } else {
                  setTimeout(erase, 500);
              }
          }

          function erase() {
              if (charIndex > 0) {
                  element.textContent = roles[roleIndex].substring(0, charIndex - 1);
                  charIndex--;
                  setTimeout(erase, 100);
              } else {
                  roleIndex++;
                  if (roleIndex >= roles.length) {
                      roleIndex = 0;
                  }
                  setTimeout(type, 150);
              }
          }

          setTimeout(type, 1000);
      })
      .catch(error => {
          console.error('Error fetching roles:', error);
      });
});
