const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

const elCommentsList = document.querySelector(".cmnts__list");
const elCommentsTemplate = document.querySelector(".cmnts__tmplt").content;
let localData = window.localStorage.getItem("postId");

const renderComments = (elem, node) => {
  node.innerHTML = null;

  const fragmentComments = document.createDocumentFragment();

  elem.forEach((elems) => {
    const commentTmplt = elCommentsTemplate.cloneNode(true);

    commentTmplt.querySelector(".cmnts__name").textContent = elems.name;
    commentTmplt.querySelector(".cmnts__email").textContent = elems.email;
    commentTmplt.querySelector(".cmnts__email").href = "mailto:" + elems.email;
    commentTmplt.querySelector(".cmnts__body").textContent = elems.body;

    fragmentComments.appendChild(commentTmplt);
  });

  node.appendChild(fragmentComments);
};

fetch("https://jsonplaceholder.typicode.com/comments")
  .then((response) => response.json())
  .then((data) => {
    if (data?.length > 0) {
      let filterData = data.filter((elem) => elem.postId == localData);
      renderComments(filterData, elCommentsList);
    }
  });
