document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('query'); // Update parameter name if needed

  if (!title) {
    // Redirect if title is empty
    window.location.href = 'blogs'; // Redirect to the blog home or another appropriate page
    return; // Exit the script to prevent further execution
  }

  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
         const ip = data.ip;
         return fetch(`https://portfolio-backend-api-nwhk.onrender.com/blogs?api_key=${ip}`);
      })       // Replace with your actual backend URL for blogs
    .then(response => response.json())
    .then(blogs => {
      const blog = blogs.find(blog => blog.title === title);
      if (blog) {
        document.getElementById('blog-title').innerText = blog.title;
        document.getElementById('blog-image').src = blog.imageurl;
        document.getElementById('blog-date').innerText = blog.dateString;
        document.getElementById('blog-author').innerText = "By " + blog.author;
        document.getElementById('blog-content').innerHTML = blog.content.replace(/\n/g, '<br>'); // Preserving line breaks
      } else {
        document.getElementById('blog-title').innerText = 'Blog not found';
      }
    })
    .catch(error => console.error('Error fetching blog:', error));
});
