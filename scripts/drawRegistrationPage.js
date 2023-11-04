// рисует форму регистрации 

import { drawEnterPage } from './drawEnterPage.js';
import { newUser } from './registrationUser.js';

// кнопка регистрации 

const initButtonRegisterListener = () => {
    const registerFormButton = document.querySelector('.register-form-button');

    registerFormButton.addEventListener('click', () => {
        newUser();
    })

}

export const drawRegistrationPage = () => {
const appHtml = document.querySelector('.container');


    const registerForm = `
    <div class="register-form">
        <h3 class="register-form-header">Форма регистрации</h3>
        <input id="registerName" type="text" class="register-form-input" placeholder="Введите имя" />
        <input id="registerLogin" type="text" class="register-form-input" placeholder="Введите логин" />
        <input id="registerPassword" type="password" class="register-form-input" placeholder="Введите пароль" />

        <button class="register-form-button">Зарегистрироваться</button>
        <a class="enter-button" href="#">Войти</a>
    </div>`;

    appHtml.innerHTML = registerForm;

    initButtonRegisterListener();

    const enterFormButton = document.querySelector('.enter-button');

    enterFormButton.addEventListener('click', () => {
        drawEnterPage({ appHtml });
    })

}