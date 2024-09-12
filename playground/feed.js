import { fetchBlogs } from "./script.js";

function displayBlogs(blogList) {
  const blogContainer = document.getElementById("blog-container");
  blogList.forEach((blog) => {
    const blogElement = document.createElement("div");
    console.table(blog);
    blogElement.innerHTML = `
        <div class="blog-items">
            <h2>${blog.title}</h2>
            <p id="content">${blog.content}</p>
            <p>Tags: ${blog.tags ? blog.tags.join(", ") : ""}</p>
            <p>Links: ${blog.links ? blog.links.map(link => `<a href="${link}" target="_blank">${link}</a>`).join(", ") : ""}</p>
        </div>
        `;
    blogContainer.appendChild(blogElement);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  fetchBlogs()
    .then((blogs) => displayBlogs(blogs))
    .catch((error) => console.error("Error:", error));
});
