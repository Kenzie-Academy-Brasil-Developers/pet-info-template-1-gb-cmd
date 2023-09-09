import { renderAllPosts } from "./render.js";
import { getCurrentUserInfo, getNewPost } from "./requests.js";

function showUserMenu() {
  const userAction = document.querySelector(".user__image");
  const menu = document.querySelector(".user__logout");

  userAction.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
  });
}

function main() {
  // Adiciona os eventos de click ao menu flutuante de logout
  showUserMenu();
  // Renderiza todos os posts no feed (render.js)
  renderAllPosts();
}
main();

async function addUserData() {
  const userImage = document.querySelector(".user__image");
  const userName = document.querySelector(".user__uniquename");
  const user = await getCurrentUserInfo();

  userImage.src = user.avatar;
  userImage.alt = "user avatar";

  userName.innerText = `@${user.username}`;

  return userImage;
}
addUserData();

function handleModal() {
  const modal = document.querySelector(".modal");

  const createPostButton = document.querySelector("#user__newpost");
  const modalCloseButton = document.querySelector("#modal__close");
  const unpostButton = document.querySelector("#cancel__button");

  const postTitle = document.querySelector("#new_post__title");
  const postContent = document.querySelector("#new_post__content");

  createPostButton.addEventListener("click", () => {
    modal.showModal();
  });

  modalCloseButton.addEventListener("click", () => {
    modal.close();
  });

  unpostButton.addEventListener("click", () => {
    postTitle.value = "";
    postContent.value = "";

    modal.close();
  });
}
handleModal();

function signOut() {
  const signOutButton = document.querySelector(".logout__button");

  signOutButton.addEventListener("click", () => {
    localStorage.removeItem("@petinfo:token");
    location.replace("../../");
  });

  return signOutButton;
}
signOut();

function createNewPost() {
  const publishButton = document.querySelector("#publish__button");
  let newPost = {};

  publishButton.addEventListener("click", async () => {
    const postTitle = document.querySelector("#new_post__title");
    const postContent = document.querySelector("#new_post__content");
    const modal = document.querySelector(".modal");
    
    newPost = {
      title: postTitle.value,
      content: postContent.value
    }
    const createNewPost = await getNewPost(newPost);

    postTitle.value = "";
    postContent.value = "";

    location.reload()
    modal.close();
  });
  return newPost;
}
createNewPost();
