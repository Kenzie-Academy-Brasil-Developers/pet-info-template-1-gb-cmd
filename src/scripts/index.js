// Desenvolva as funcionalidades de login aqui
import { getLogin } from "./requests.js";

const getLoginData = () => {
    const loginSubmit = document.getElementById("login__submit");
    const registerButton = document.getElementById("register__button");
    let loginData = {};
    
    loginSubmit.addEventListener("click", async (event) => {
        event.preventDefault();

        const inputEmail = document.getElementById("Email");
        const inputPassword = document.getElementById("Senha");

        loginData = {
            email: inputEmail.value,
            password: inputPassword.value
        };

        const login = await getLogin(loginData);
    });

    registerButton.addEventListener("click", () => {
        location.assign("./src/pages/register.html");
    });
}
getLoginData();