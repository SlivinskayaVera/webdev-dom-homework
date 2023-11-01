// Добавление нового коммента

import {sanitizeHtml} from './sanitizeHtml.js';
import {getCommentsByFetchResponse} from './main.js'

const inputNameElement = document.getElementById("input-name");
const inputTextElement = document.querySelector(".add-form-text");
const inputFormElement = document.querySelector(".add-form");
const loadingFormElement = document.querySelector(".loading");

const addNewComment = ({token}) => {
    const nameUser = sanitizeHtml(inputNameElement.value);
    const textUser = sanitizeHtml(inputTextElement.value);

    loadingFormElement.classList.add("display-flex");
    inputFormElement.classList.add("display-hidden");

    postComment({textUser, nameUser, token});
};

const postComment = ({textFromUser, nameFromUser, token}) => {

    postCommentByFetch({ textFromUser, nameFromUser, token })
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

                postComment({textFromUser, nameFromUser, token});
                console.log('пробую отправить запрос на сервер');
            }

            else (
                alert('Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже')
            )
        });
};

export {addNewComment, postComment}