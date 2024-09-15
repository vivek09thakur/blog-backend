const api_uri = 'https://blog-backend-psi-ten.vercel.app';
// const api_uri = "http://127.0.0.1:8000/";

function authAdmin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`${api_uri}/auth/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Authentication successful");
        localStorage.setItem("token", data.token);
        if (localStorage.getItem("token")) {
          window.location.href = "./draft.html";
        }
      } else {
        alert("Authentication failed: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred during authentication");
    });
}

function writeBlog(event) {
  event.preventDefault();

  const blogData = {
    blog_title: document.getElementById("blog_title").value,
    blog_content: document.getElementById("blog_content").value,
    blog_tags: document.getElementById("blog_tags").value,
    blog_links_list: document.getElementById("blog_links").value,
  };

  fetch(`${api_uri}/write_blog/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  })
    .then((response) => response.json())
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

async function fetchBlogs() {
  const response = await fetch(`${api_uri}/get_blogs/`);
  const data = await response.json();
  if (data.status === "success") {
    return data.blogs;
  } else {
    throw new Error("Error fetching blogs: " + data.message);
  }
}

async function deleteAllBlogs() {
  const confirmDelete = confirm(
    "Are you sure you want to delete all blogs? This action cannot be reversed ()."
  );
  if (confirmDelete) {
    try {
      const response = await fetch(`${api_uri}/delete_all/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
      } else {
        alert("Error deleting all blog posts: " + data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting all blog posts.");
    }
  }
}

async function delete_blog(blog_id) {
  const response = await fetch(`${api_uri}/delete_blog/${blog_id}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (data.status === "success") {
    alert(data.message);
  } else {
    alert("Error deleting blog post: " + data.message);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const uploadForm = document.querySelector(".upload-form");
  const deleteAllButton = document.getElementById("delete_all");
  if (uploadForm) {
    uploadForm.addEventListener("submit", writeBlog);
  }
  if (deleteAllButton) {
    deleteAllButton.addEventListener("click", deleteAllBlogs);
  }
  if (!uploadForm && !deleteAllButton) {
    console.error("Upload form and Delete All button not found");
  }
});

export { writeBlog, fetchBlogs, delete_blog, deleteAllBlogs, authAdmin };
