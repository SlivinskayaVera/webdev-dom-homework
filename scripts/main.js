import { renderComments } from './renderfComments.js';
import { getFetchResponse, postCommentByFetch, enterUser, registerUser } from './api.js';
import { initButtonEditCommentListener } from './editcomment.js';
import { initReplyCommentListener } from './replyсomment.js';
import { initButtonLikeListeners } from './buttonlike.js';
import { enterByLogin } from './enterByLogin.js';
import { newUser } from './registrationUser.js'


const listElement = document.querySelector(".comments");
const loadingCommentsElement = document.querySelector(".loading-comments");
const inputFormElement = document.querySelector(".add-form");
const loadingFormElement = document.querySelector(".loading");
const buttonForAuthorization = document.querySelector('.authorizationButton');
const appHtml = document.querySelector('.container');


let comments = [];
let userData;

// fetch запрос для массива комментариев

const getCommentsByFetchResponse = () => {
    loadingCommentsElement.classList.add("display-flex");

    getFetchResponse()
        .then((responseComments) => {
            const appComments = responseComments.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                    isEditor: false
                };
            });

            comments = appComments;
            renderCommentsList();
        })
        .then(() => {
            loadingCommentsElement.classList.remove("display-flex");
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался') {
                alert('Сервер сломался, попробуй позже');
            }
            alert('Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже')
        })
};

getCommentsByFetchResponse();



// кнопка войти: иницализация и обработчик на вход в учетку
const initButtonEnterListener = () => {
    const enterFormButton = document.querySelector('.enter-form-button');

    enterFormButton.addEventListener('click', () => {
        enterByLogin({ comments, userData });
    });
}

// кнопка регистрации 

const initButtonRegisterListener = () => {
    const registerFormButton = document.querySelector('.register-form-button');

    registerFormButton.addEventListener('click', () => {
        newUser();
    })

}

// рисует форму регистрации 

const drawRegistrationPage = () => {

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
        drawEnterPage();
    })

}

// рисует форму входа

const drawEnterPage = () => {

    const enterFormHTML = `
        <div class="enter-form">
            <h3 class="enter-form-header">Форма входа</h3>
            <input id="enterLogin" type="text" class="enter-form-input" placeholder="Введите логин" />
            <input id="enterPassword" type="password" class="enter-form-input" placeholder="Введите пароль" />

            <button class="enter-form-button">Войти</button>
            <a class="register-button" href="#">Зарегистрироваться</a>
        </div>`;

    appHtml.innerHTML = enterFormHTML;

    initButtonEnterListener();


    const registerButton = document.querySelector('.register-button');

    registerButton.addEventListener('click', () => {
        drawRegistrationPage();
    })
}

// ссылка на авторизацию 
buttonForAuthorization.addEventListener('click', () => {
    drawEnterPage();
});



// Рендер комментов

function renderCommentsList() {

    loadingFormElement.classList.remove("display-flex");
    inputFormElement.classList.remove("display-hidden");


    listElement.innerHTML = renderComments({ comments });

    initReplyCommentListener();
    initButtonLikeListeners();

};

renderCommentsList();

export { comments, renderCommentsList, getCommentsByFetchResponse, drawEnterPage };

console.log("Modules work!");