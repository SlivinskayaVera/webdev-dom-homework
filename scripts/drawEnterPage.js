import { userData } from "./main.js";
import { drawRegistrationPage } from "./drawRegistrationPage.js";
import { enterByLogin } from "./enterByLogin.js";

// кнопка войти: иницализация и обработчик на вход в учетку

const initButtonEnterListener = ({ comments }) => {
    const enterFormButton = document.querySelector(".enter-form-button");

    enterFormButton.addEventListener("click", () => {
        enterByLogin({ comments, userData });
    });
};

export const drawEnterPage = ({ appHtml, comments }) => {
    const enterFormHTML = `
        <div class="enter-form">
            <h3 class="enter-form-header">Форма входа</h3>
            <input id="enterLogin" type="text" class="enter-form-input" placeholder="Введите логин" />
            <input id="enterPassword" type="password" class="enter-form-input" placeholder="Введите пароль" />

            <button class="enter-form-button">Войти</button>
            <a class="register-button" href="#">Зарегистрироваться</a>
        </div>`;

    appHtml.innerHTML = enterFormHTML;

    initButtonEnterListener({ comments });

    const registerButton = document.querySelector(".register-button");

    registerButton.addEventListener("click", () => {
        drawRegistrationPage({ comments });
    });
};
