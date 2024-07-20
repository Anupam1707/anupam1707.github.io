document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const title = urlParams.get('query');

  fetch('https://portfolio-backend-api-nwhk.onrender.com/blogs') // Replace with your actual backend URL for blogs
    .then(response => response.json())
    .then(blogs => {
      const blog = blogs.find(blog => blog.title === title);
      if (blog) {
        document.getElementById('blog-title').innerText = blog.title;
        document.getElementById('blog-image').src = blog.imageurl;
        document.getElementById('blog-date').innerText = blog.date
        document.getElementById('blog-author').innerText = "By " + blog.author
        document.getElementById('blog-content').innerHTML = blog.content.replace(/\n/g, '<br>'); // Preserving line breaks
      } else {
        document.getElementById('blog-title').innerText = 'Blog not found';
      }
    })
    .catch(error => console.error('Error fetching blog:', error));
});
