document.addEventListener('DOMContentLoaded', function() {
  const element = document.getElementById('roles');
  
  function startTypewriter(roles) {
      let roleIndex = 0;
      let charIndex = 0;

      function type() {
          if (!roles[roleIndex]) return;
          // Trim any carriage returns or extra whitespace
          const currentRole = roles[roleIndex].trim();
          if (charIndex < currentRole.length) {
              element.textContent += currentRole.charAt(charIndex);
              charIndex++;
              setTimeout(type, 50);
          } else {
              setTimeout(erase, 1500); // 1.5s pause when word is fully typed
          }
      }

      function erase() {
          const currentRole = roles[roleIndex].trim();
          if (charIndex > 0) {
              element.textContent = currentRole.substring(0, charIndex - 1);
              charIndex--;
              setTimeout(erase, 50); // Slightly faster erase for responsiveness
          } else {
              roleIndex = (roleIndex + 1) % roles.length;
              setTimeout(type, 200);
          }
      }

      setTimeout(type, 500);
  }

  // Fetch roles from roles.txt
  fetch('misc/roles.txt')
      .then(response => {
          if (!response.ok) throw new Error('Network response not ok');
          return response.text();
      })
      .then(data => {
          const roles = data.split('\n').filter(role => role.trim().length > 0);
          startTypewriter(roles);
      })
      .catch(error => {
          console.warn('Error fetching roles, using local fallback:', error);
          const fallbackRoles = [
              "a Full Stack Developer",
              "a Web App Developer",
              "a Website Designer",
              "a Video Editor",
              "a Blog Writer"
          ];
          startTypewriter(fallbackRoles);
      });
});
