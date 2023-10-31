import { sanitizeHtml } from './sanitizeHtml.js';
import { renderComments } from './renderfComments.js';
import { getFetchResponse, postCommentByFetch, enterUser } from './api.js';
import { initButtonEditCommentListener } from './editcomment.js';
import { initReplyCommentListener } from './replyсomment.js';
import { initButtonLikeListeners } from './buttonlike.js';
import { renderPage } from './renderPage.js'


const listElement = document.querySelector(".comments");
const inputNameElement = document.getElementById("input-name");
const inputTextElement = document.querySelector(".add-form-text");
const loadingCommentsElement = document.querySelector(".loading-comments");
const inputFormElement = document.querySelector(".add-form");
const loadingFormElement = document.querySelector(".loading");


let comments = [];

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



// Добавление нового коммента

const addNewComment = () => {
    const nameUser = sanitizeHtml(inputNameElement.value);
    const textUser = sanitizeHtml(inputTextElement.value);

    loadingFormElement.classList.add("display-flex");
    inputFormElement.classList.add("display-hidden");

    postComment(textUser, nameUser);
};

const postComment = (textFromUser, nameFromUser) => {

    postCommentByFetch({ textFromUser, nameFromUser })
        .then(() => {

            getCommentsByFetchResponse();

            inputNameElement.value = "";
            inputTextElement.value = "";

        }).catch((error) => {

            loadingFormElement.classList.remove("display-flex");
            inputFormElement.classList.remove("display-hidden");

            if (error.message === "Короткий комментарий или имя") {
                alert('Вы ввели слишком короткое имя или комментарий, попробуйте еще раз');
                return;
            }

            else if (error.message === 'Сервер сломался') {

                postComment(textFromUser, nameFromUser);
                console.log('пробую отправить запрос на сервер');
            }

            else (
                alert('Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже')
            )
        });
};


const buttonForAuthorization = document.querySelector('.authorizationButton');
const appHtml = document.querySelector('.container');

buttonForAuthorization.addEventListener('click', () => {

    const enterForm = `
        <div class="enter-form">
            <h3 class="enter-form-header">Форма входа</h3>
            <input id="enterLogin" type="text" class="enter-form-input" placeholder="Введите логин" />
            <input id="enterPassword" type="text" class="enter-form-input" placeholder="Введите пароль" />

            <button class="enter-form-button">Войти</button>
            <a class="registerButton" href="#">Зарегистрироваться</a>
        </div>`;
    appHtml.innerHTML = enterForm;    

    const enterFormButton = document.querySelector('.enter-form-button');
    
    enterFormButton.addEventListener('click', () => {
        const enterLogin = document.getElementById('enterLogin');
        const enterPassword = document.getElementById('enterPassword');
        let userdata;

        enterUser({
            login: enterLogin.value,
            password: enterPassword.value,
        })
        .then((responseData) => {
            return userdata = responseData.user;
        })
        .then(() => {
            appHtml.innerHTML = renderPage({comments, userdata});  
            console.log(renderPage({comments}));  
            console.log(userdata);
        });
    
    });
});


// Рендер функция

function renderCommentsList() {

    // loadingFormElement.classList.remove("display-flex");
    // inputFormElement.classList.remove("display-hidden");

    listElement.innerHTML = renderComments({ comments });

    initButtonEditCommentListener();
    initReplyCommentListener();
    initButtonLikeListeners();
};

renderCommentsList();

export { comments, renderCommentsList, getCommentsByFetchResponse };

console.log("Modules work!");