function writeBlog(event) {
    event.preventDefault();
    
    const blogData = {
        blog_title: document.getElementById('blog_title').value,
        blog_content: document.getElementById('blog_content').value,
        blog_tags: document.getElementById('blog_tags').value,
        blog_links_list: document.getElementById('blog_links').value
    };

    fetch('http://127.0.0.1:8000/write_blog/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(blogData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Blog post created successfully!');
            document.querySelector('.upload-form').reset();
        } else {
            alert('Error creating blog post: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch all blogs
function fetchBlogs() {
    fetch('http://127.0.0.1:8000/get_blogs/')
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            const blogList = data.blogs;
            // Display the blogs on the page
            const blogContainer = document.createElement('div');
            blogContainer.id = 'blog-container';
            blogList.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.innerHTML = `
                    <h2>${blog.title}</h2>
                    <p>${blog.content}</p>
                    <p>Tags: ${blog.tags.join(', ')}</p>
                    <p>Links: ${blog.links.join(', ')}</p>
                    <hr>
                `;
                blogContainer.appendChild(blogElement);
            });
            document.body.appendChild(blogContainer);
        } else {
            alert('Error fetching blogs: ' + data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

// Add event listener to the form
document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.querySelector('.upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', writeBlog);
    }
    fetchBlogs();
});
