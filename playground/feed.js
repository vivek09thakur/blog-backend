import { fetchBlogs, delete_blog } from "./script.js";

function displayBlogs(blogList) {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = '';
  blogList.forEach((blog) => {
    const blogElement = document.createElement("div");
    console.table(blog);
    blogElement.innerHTML = `
        <div class="blog-items">
            <h2>${blog.title}</h2>
            <p id="content">${blog.content}</p>
            <p>Tags: ${blog.tags ? blog.tags.join(", ") : ""}</p>
            <p>Links: ${blog.links ? blog.links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(", ") : ""}</p>
            <p>Post ID: ${blog.id}</p>
            <button class="delete-blog" data-id="${blog.id}">Delete</button>
        </div>
        `;
    blogContainer.appendChild(blogElement);
  });

  // Add event listeners to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-blog');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function() {
      const blogId = this.getAttribute('data-id');
      delete_blog(blogId).then(() => {
        // Refresh the blog list after deletion
        fetchBlogs()
          .then((blogs) => displayBlogs(blogs))
          .catch((error) => console.error("Error:", error));
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchBlogs()
    .then((blogs) => displayBlogs(blogs))
    .catch((error) => console.error("Error:", error));
});
