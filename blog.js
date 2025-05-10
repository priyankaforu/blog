const config = {
    blogContentElement: 'blog-content',
    postsDirectories: [],
    defaultPost: 'posts/2024/Being_Priceless.md'
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/marked/4.3.0/marked.min.js';
    script.onload = initializeBlog;
    document.head.appendChild(script);
  });
  
  async function tryLoadingFromYears(startYear, endYear) {
    const directories = [];
    for (let year = startYear; year <= endYear; year++) {
      const directory = `posts/${year}/`;
      try {
        const response = await fetch(`${directory}posts.json`, { method: 'HEAD' });
        if (response.ok) {
          directories.push(directory);
        }
      } catch (error) {
        console.log(`No posts.json found for year ${year}`);
      }
    }
    return directories;
  }
  
  async function initializeBlog() {
    const currentYear = new Date().getFullYear();
    config.postsDirectories = await tryLoadingFromYears(currentYear - 1, currentYear);
    console.log(config.postsDirectories);
    
    marked.setOptions({
      gfm: true,
      breaks: true,
      mangle: false,
      headerIds: true,
      sanitize: false
    });
    
    const blogContentElement = document.getElementById(config.blogContentElement);
    if (!blogContentElement) {
      console.error(`Element with an ID "${config.blogContentElement}" is not found`);
      return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('post') || config.defaultPost;
    
    if (postFile) {
      if (postFile.includes('/')) {
        loadMarkdownPost(postFile);
      } else {
        findAndLoadPost(postFile);
      }
    } else {
      loadMarkdownPost(config.defaultPost);
    }
  }
  
  async function findAndLoadPost(filename) {
    const blogContentElement = document.getElementById(config.blogContentElement);
    
    if (!filename.endsWith('.md')) {
      filename = filename + '.md';
    }
    
    for (const directory of config.postsDirectories) {
      const filePath = `${directory}${filename}`;
      try {
        const response = await fetch(filePath, { method: 'HEAD' });
        if (response.ok) {
          loadMarkdownPost(filePath);
          return;
        }
      } catch (error) {
        console.log(`Post not found in ${directory}`);
      }
    }
    
    blogContentElement.innerHTML = `<div class="error-message">
      <h2>Post Not Found</h2>
      <p>The requested post "${filename}" was not found in any directory.</p>
    </div>`;
  }
  
  async function loadMarkdownPost(filePath) {
    const blogContentElement = document.getElementById(config.blogContentElement);
    
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to load Post: ${response.status} ${response.statusText}`);
      }
      
      const markdownContent = await response.text();
      const htmlContent = marked.parse(markdownContent);
      
      blogContentElement.innerHTML = htmlContent;
      
      const firstHeader = blogContentElement.querySelector('h1');
      if (firstHeader) {
        document.title = firstHeader.textContent;
      }
      
      updatePageLinks();
  
      if (window.Prism) {
        Prism.highlightAllUnder(blogContentElement);
      }
    } catch (error) {
      console.error('Error loading markdown post:', error);
      blogContentElement.innerHTML = `<div class="error-message">
        <h2>Error Loading Post</h2>
        <p>${error.message}</p>
      </div>`;
    }
  }
  
  function updatePageLinks() {
    document.querySelectorAll('a[data-md-post]').forEach(link => {
      const postName = link.getAttribute('data-md-post');
      link.href = `?post=${postName}`;
    });
  }