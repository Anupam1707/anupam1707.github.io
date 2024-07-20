document.addEventListener('DOMContentLoaded', () => {
    const loadingIndicator = document.getElementById('loading');
    const blogListContainer = document.getElementById('blog-list-container');
  
    fetch('https://portfolio-backend-api-nwhk.onrender.com/blogs') // Replace with your actual backend URL for blogs
      .then(response => response.json())
      .then(blogs => {
        displayBlogs(blogs);
        loadingIndicator.style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        loadingIndicator.innerText = 'Failed to load blogs.';
      });
  
    function displayBlogs(blogs) {
      blogListContainer.innerHTML = ''; // Clear the container first
      for (let i = blogs.length - 1; i >= 0; i--) {
        const blog = blogs[i];
        const blogElement = document.createElement('div');
        blogElement.className = 'blog-post';
        blogElement.innerHTML = `
          <a href="blog.html?query=${encodeURIComponent(blog.title)}">
            <img src="${blog.imageurl}" alt="${blog.title}" class="blog-image">
          </a>
          <div class="blog-content">
            <h2>${blog.title}</h2>
            <h3>By ${blog.author}</h3>
            <h3>${blog.date}</h3>
            <p>${blog.description}</p>
          </div>
        `;
        blogListContainer.appendChild(blogElement);
      }
    }
  });
  