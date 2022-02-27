const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

const elPostsList = document.querySelector(".posts__list");
const elPostTemplate = document.querySelector(".post-template").content;
const elCommentsBtn = document.querySelector(".comments-btn");
const userId = window.localStorage.getItem("id");

const renderPosts = (elem, node) => {
  node.innerHTML = null;

  const fragmentPosts = document.createDocumentFragment();

  elem.forEach((elements) => {
    const postTmplt = elPostTemplate.cloneNode(true);

    postTmplt.querySelector(".post__title").textContent = elements.title;
    postTmplt.querySelector(".post__body").textContent = elements.body;
    postTmplt.querySelector(".comments-btn").dataset.uuid = elements.id;

    let comments_btn = postTmplt.querySelector(".comments-btn");

    comments_btn.addEventListener("click", (evt) => {
      window.localStorage.setItem("postId", evt.target.dataset.uuid);
      window.location.replace("comments.html");
    });

    fragmentPosts.appendChild(postTmplt);
  });

  node.appendChild(fragmentPosts);
};

fetch("https://jsonplaceholder.typicode.com/posts/")
  .then((response) => response.json())
  .then((data) => {
    if (data?.length > 0) {
      let posts = data.filter((post) => post.userId == userId);
      renderPosts(posts, elPostsList);
    }
  });
