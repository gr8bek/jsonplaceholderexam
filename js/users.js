const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

const elUserList = document.querySelector(".users__list");
const elTemplate = document.querySelector(".template").content;
const elLogOutBtn = document.querySelector(".logout-btn");
const post_btn = document.querySelector(".post_btn");

const renderUsers = (array, node) => {
  node.innerHTML = null;

  const fragment = document.createDocumentFragment();

  array.forEach((element) => {
    const userTmplt = elTemplate.cloneNode(true);

    userTmplt.querySelector(".user__name").textContent = element.name;
    userTmplt.querySelector(".user__username").textContent = element.username;
    userTmplt.querySelector(".user__email").textContent = element.email;
    userTmplt.querySelector(".user__email").href = "mailto:" + element.email;
    userTmplt.querySelector(".user__adress").textContent =
      element.address.street +
      " " +
      element.address.suite +
      " " +
      element.address.city +
      " " +
      element.address.zipcode;
    userTmplt.querySelector(".user__phone").textContent = element.phone;
    userTmplt.querySelector(".user__phone").href = "tel:" + element.phone;
    userTmplt.querySelector(".user__website").textContent = element.website;
    userTmplt.querySelector(".user__website").href = "" + element.website;
    userTmplt.querySelector(".user__company--name").textContent =
      element.company.name;
    userTmplt.querySelector(".post-btn").textContent = "Post";
    userTmplt.querySelector(".post-btn").dataset.uuid = element.id;

    fragment.appendChild(userTmplt);
  });

  node.appendChild(fragment);
};

fetch("https://jsonplaceholder.typicode.com/users/")
  .then((response) => response.json())
  .then((data) => {
    if (data?.length > 0) {
      renderUsers(data, elUserList);
    }
  });

elUserList.addEventListener("click", (evt) => {
  evt.preventDefault();

  const postBtn = evt.target.matches(".post-btn");

  if (postBtn) {
    window.localStorage.setItem("id", evt.target.dataset.uuid);
    window.location.replace("post.html");
  }
});

elLogOutBtn.addEventListener("click", (evt) => {
  evt.preventDefault();

  if (evt.target.matches(".logout-btn")) {
    localStorage.removeItem(".token");
    window.location.replace("index.html");
  }
});
