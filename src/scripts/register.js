// Desenvolva as funcionalidades de cadastro aqui
import { getRegister } from "./requests.js";

const getRegisterData = () => {
    const registerSubmit = document.getElementById("register__submit");

    let registerData = {};

    registerSubmit.addEventListener("click", (event) => {
        event.preventDefault();

        const usernameInput = document.getElementById("user");
        const emailInput = document.getElementById("Email");
        const passwordInput = document.getElementById("Senha");
        const pictureInput = document.getElementById("picture");

        registerData = {
            username: usernameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            avatar: pictureInput.value
        }

        getRegister(registerData);
    })
}
getRegisterData();

function returnToLogin() {
    const redirectButton = document.querySelector("#redirect__button");

    redirectButton.addEventListener("click", () => {
        location.replace("../../");
    });

    return redirectButton;
}
returnToLogin();