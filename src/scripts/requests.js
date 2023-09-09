const baseUrl = "http://localhost:3333";
const token = JSON.parse(localStorage.getItem(("@petinfo:token")));

const requestHeaders = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

// Informações de usuário logado
export async function getCurrentUserInfo() {
  const request = await fetch(`${baseUrl}/users/profile`, {
    method: "GET",
    headers: requestHeaders,
  });
  const user = await request.json();

  return user;
}

// Listagem de posts
export async function getAllPosts() {
  const request = await fetch(`${baseUrl}/posts`, {
    method: "GET",
    headers: requestHeaders,
  });
  const posts = await request.json();

  return posts;
}

// Desenvolva as funcionalidades de requisições aqui
export async function getLogin(data) {
  const flagEmailError = document.getElementById("wrong-email");
  const flagPasswordError = document.getElementById("wrong-password");
  const request = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    const userToken = data.token;

    if(data.message === 'O email está incorreto') {
      flagEmailError.classList.remove("hidden");
      flagPasswordError.classList.add("hidden");

    } else if(data.message === "A senha está incorreta") {
      flagEmailError.classList.add("hidden");
      flagPasswordError.classList.remove("hidden");

    } else {
      localStorage.setItem("@petinfo:token", JSON.stringify(userToken));
      location.replace("./src/pages/feed.html");
    }
  });
  
}

export async function getRegister(data) {
  const request = await fetch(`${baseUrl}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if(res.ok) {
      location.replace("../../");
    }
  });
}

export async function getNewPost(data) {
  const request = await fetch(`${baseUrl}/posts/create`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(data)
  });
  const newPost = await request.json();
  
  return newPost;
}

export async function getFullPost(userId) {
  const request = await fetch(`${baseUrl}/posts/${userId}`, {
    method: "GET",
    headers: requestHeaders,
  })

  const fullPost = await request.json();

  return fullPost;
}
