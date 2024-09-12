function writeBlog(event) {
  event.preventDefault();

  const blogData = {
    blog_title: document.getElementById("blog_title").value,
    blog_content: document.getElementById("blog_content").value,
    blog_tags: document.getElementById("blog_tags").value,
    blog_links_list: document.getElementById("blog_links").value,
  };

  fetch("http://127.0.0.1:8000/write_blog/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),  })
    .then(response => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert(data.message);
        document.querySelector(".upload-form").reset();
      } else {
        alert("Error creating blog post: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while creating the blog post.");
    });
}


// call the writeBlog function when the form is submitted
document.addEventListener("DOMContentLoaded", function() {
  const uploadForm = document.querySelector(".upload-form");
  if (uploadForm) {
    uploadForm.addEventListener("submit", writeBlog);
  } else {
    console.error("Upload form not found");
  }
});

// Function to fetch all blogs
async function fetchBlogs() {
  const response = await fetch("http://127.0.0.1:8000/get_blogs/");
  const data = await response.json();
  if (data.status === "success") {
    return data.blogs;
  } else {
    throw new Error("Error fetching blogs: " + data.message);
  }
}

// Export the functions for use in other files
export { writeBlog, fetchBlogs };
