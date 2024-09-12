function writeBlog(event) {
  event.preventDefault();

  const blogData = {
    blog_title: document.getElementById("blog_title").value,
    blog_content: document.getElementById("blog_content").value,
    blog_tags: document.getElementById("blog_tags").value.split(","),
    blog_links_list: document.getElementById("blog_links").value.split(","),
  };

  fetch("http://127.0.0.1:8000/write_blog/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(blogData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Blog post created successfully!");
        document.querySelector(".upload-form").reset();
      } else {
        alert("Error creating blog post: " + data.message);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Function to fetch all blogs
function fetchBlogs() {
  return fetch("http://127.0.0.1:8000/get_blogs/")
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        return data.blogs;
      } else {
        throw new Error("Error fetching blogs: " + data.message);
      }
    });
}

// Export the functions for use in other files
export { writeBlog, fetchBlogs };
