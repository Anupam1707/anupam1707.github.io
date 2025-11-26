document.addEventListener('DOMContentLoaded', () => {
  const loadingIndicator = document.getElementById('loading');
  const blogListContainer = document.getElementById('blog-list-container');
  const categorySelect = document.getElementById('category-select');
  const sortSelect = document.getElementById('sort-select');

  const categoriesFilePath = '/misc/categories.txt'; // Update this path as needed

  function fetchCategories() {
    console.log('Fetching categories from:', categoriesFilePath);
    fetch(categoriesFilePath)
      .then(response => response.text())
      .then(data => {
        console.log('Categories data fetched:', data);
        const categories = parseCategories(data);
        console.log('Parsed categories:', categories);
        populateCategorySelect(categories);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }

  function parseCategories(data) {
    const lines = data.trim().split('\n');
    const categories = {};
    lines.forEach(line => {
      const [displayName, value] = line.split(',');
      if (displayName && value) {
        categories[displayName.trim()] = value.trim();
      }
    });
    return categories;
  }  

  function populateCategorySelect(categories) {
    console.log('Populating category select with:', categories);
    categorySelect.innerHTML = ''; // Clear existing options
    for (const [displayName, value] of Object.entries(categories)) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = displayName;
      categorySelect.appendChild(option);
    }
  }

  function fetchBlogs() {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
         const ip = data.ip;
         return fetch(`https://github.pythonanywhere.com/blogs`);
      })      
      .then(response => response.json())
      .then(blogs => {
        console.log('Blogs fetched:', blogs);
        const filteredBlogs = filterBlogsByCategory(blogs);
        console.log('Filtered blogs:', filteredBlogs);
        const sortedBlogs = sortBlogs(filteredBlogs);
        console.log('Sorted blogs:', sortedBlogs);
        displayBlogs(sortedBlogs);
        loadingIndicator.style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        loadingIndicator.innerText = 'Failed to load blogs.';
      });
  }

  function filterBlogsByCategory(blogs) {
    const selectedCategory = categorySelect.value;
    console.log('Filtering blogs by category:', selectedCategory);
    const filtered = selectedCategory === 'all' ? blogs : blogs.filter(blog => blog.category === selectedCategory);
    console.log('Blogs after filtering:', filtered);
    return filtered;
  }

  function sortBlogs(blogs) {
    const sortOrder = sortSelect.value;
    console.log('Sorting blogs with pinned posts first, then by date:', sortOrder);
    const sorted = blogs.sort((a, b) => {
      if (a.pinned === "true" && b.pinned !== "true") return -1;
      if (a.pinned !== "true" && b.pinned === "true") return 1;
      return sortOrder === 'latest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
    });
    console.log('Blogs after sorting:', sorted);
    return sorted;
  }

  function displayBlogs(blogs) {
    console.log('Displaying blogs:', blogs);
    blogListContainer.innerHTML = ''; // Clear the container first
    if (blogs.length === 0) {
      const noPostsMessage = document.createElement('div');
      noPostsMessage.className = 'no-posts-message';
      noPostsMessage.innerText = 'No blog posts found\nNew Posts coming soon.';
      blogListContainer.append(noPostsMessage);
    } else {
      blogs.forEach(blog => {
        const blogElement = document.createElement('div');
        blogElement.className = 'blog-post';
        blogElement.innerHTML = `
          <a href="blog.html?query=${encodeURIComponent(blog.title)}">
            <img src="${blog.imageurl}" alt="${blog.title}" class="blog-image">
          </a>
          <div class="blog-content">
            ${blog.pinned === "true" ? '<p class="blog-pin">Pinned by Author &#128204;</p>' : ''}
            <h2 class="blog-title">${blog.title}</h2>
            <h3 class="blog-author">By ${blog.author}</h3>
            <h3 class="blog-date">${blog.dateString}</h3>
            <p class="blog-desc">${blog.description}</p>
          </div>
        `;
        blogListContainer.append(blogElement);
      });
    }
  }

  // Fetch categories and blogs on page load
  fetchCategories();
  fetchBlogs();

  // Fetch blogs when category or sort option changes
  categorySelect.addEventListener('change', fetchBlogs);
  sortSelect.addEventListener('change', fetchBlogs);
});
