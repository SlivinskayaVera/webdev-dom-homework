// Добавление нового коммента

import { sanitizeHtml } from './sanitizeHtml.js';
import { getCommentsByFetchResponse } from './getCommentsRenderPage.js';
import { postCommentByFetch } from './api.js';
import { comments } from './main.js'


export const addNewComment = ({ token, commentFromInput }) => {
    const inputFormElement = document.querySelector(".add-form");
    const loadingFormElement = document.querySelector(".loading");
    
    const textUser = sanitizeHtml(commentFromInput);

    loadingFormElement.classList.add("display-flex");
    inputFormElement.classList.add("display-hidden");

    postComment({ textUser, token });

};

const postComment = ({ textUser, token }) => {

    postCommentByFetch({ textUser, token })
        .then(() => {

            getCommentsByFetchResponse({ comments });

            const inputTextElement = document.querySelector(".add-form-text");
            inputTextElement.value = "";

        }).catch((error) => {
            const inputFormElement = document.querySelector(".add-form");
            const loadingFormElement = document.querySelector(".loading");

            loadingFormElement.classList.remove("display-flex");
            inputFormElement.classList.remove("display-hidden");

            if (error.message === "Короткий комментарий или имя") {
                alert('Вы ввели слишком короткое имя или комментарий, попробуйте еще раз');
                return;
            }

            else if (error.message === 'Сервер сломался') {

                postComment({ textUser, token });
                console.log('пробую отправить запрос на сервер');
            }

            else (
                alert('Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже')
            )
        });
};

