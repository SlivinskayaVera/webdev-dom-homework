import { sanitizeHtml } from './sanitizeHtml.js';
import { renderComments } from './renderfunction.js';
import { getFetchResponse, postCommentByFetch } from './api.js';
import { initButtonEditCommentListener } from './editcomment.js';
import { initReplyCommentListener } from './replyсomment.js';
import { initButtonLikeListeners } from './buttonlike.js';


const listElement = document.querySelector(".comments");
const inputNameElement = document.getElementById("input-name");
const inputTextElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
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



// Обработчики для кнопки Написать

inputTextElement.addEventListener("keyup", (enter) => {

    if (enter.code === 'Enter' && inputNameElement.value !== "" && inputTextElement.value !== "") {
        addNewComment();
        buttonElement.disabled = true;
    }
});

inputNameElement.addEventListener("keyup", (enter) => {

    if (enter.code === 'Enter' && inputNameElement.value !== "" && inputTextElement.value !== "") {
        addNewComment();
        buttonElement.disabled = true;
    }
})

buttonElement.addEventListener("click", () => {
    addNewComment();
    buttonElement.disabled = true;
});

document.addEventListener("input", () => {
    if (inputNameElement.value !== "" && inputTextElement.value !== "") {
        buttonElement.disabled = false;
    } else {
        buttonElement.disabled = true;
    }
});


// Рендер функция

function renderCommentsList() {

    loadingFormElement.classList.remove("display-flex");
    inputFormElement.classList.remove("display-hidden");

    listElement.innerHTML = renderComments({ comments });

    initButtonEditCommentListener();
    initReplyCommentListener();
    initButtonLikeListeners();
};

renderCommentsList();

export { comments, renderCommentsList };

console.log("Modules work!");