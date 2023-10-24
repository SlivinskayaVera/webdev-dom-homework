import { sanitizeHtml } from './sanitizeHtml.js';
import { renderComments } from './renderfunction.js';
import { getFetchResponse, postCommentByFetch } from './api.js';


const inputNameElement = document.getElementById("input-name");
const inputTextElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
const buttonDelElement = document.querySelector(".del-form-button");
const listElement = document.querySelector(".comments");
const loadingCommentsElement = document.querySelector(".loading-comments");
const buttonsLikeElement = document.querySelectorAll(".like-button");
const inputFormElement = document.querySelector(".add-form");
const loadingFormElement = document.querySelector(".loading");


let comments = [];


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

buttonElement.addEventListener("click", () => {
    addNewComment();
    buttonElement.disabled = true;
});


const postComment = (textFromUser, nameFromUser) => {

    postCommentByFetch({textFromUser, nameFromUser})
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

const addNewComment = () => {
    const nameUser = sanitizeHtml(inputNameElement.value);
    const textUser = sanitizeHtml(inputTextElement.value);

    loadingFormElement.classList.add("display-flex");
    inputFormElement.classList.add("display-hidden");

    postComment(textUser, nameUser);
};


// Удаление последнего коммента

buttonDelElement.addEventListener("click", () => {
    comments.pop();
    renderCommentsList();
});



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

document.addEventListener("input", () => {
    if (inputNameElement.value !== "" && inputTextElement.value !== "") {
        buttonElement.disabled = false;
    } else {
        buttonElement.disabled = true;
    }
});



// Обработчик лайки


function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

const initButtonLikeListeners = () => {
    const buttonsLikeElement = document.querySelectorAll(".like-button");


    for (const buttonLikeElement of buttonsLikeElement) {
        buttonLikeElement.addEventListener("click", (event) => {
            event.stopPropagation();

            let index = buttonLikeElement.dataset.index;
            buttonLikeElement.classList.add("-loading-like");

            delay(2000).then(() => {
                const comment = comments[index];

                if (!comment.isLiked) {
                    comment.isLiked = true;
                    comment.likes += 1;

                } else {
                    comment.isLiked = false;
                    comment.likes -= 1;
                }
                buttonLikeElement.classList.remove("-loading-like");

                renderCommentsList();
            });
        })
    }
};

initButtonLikeListeners();



// Обработчик редактирования коммента

const initButtonEditCommentListener = () => {
    const buttonsEditCommentElement = document.querySelectorAll(".button-edit-comment");

    for (const buttonEditCommentElement of buttonsEditCommentElement) {
        buttonEditCommentElement.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = buttonEditCommentElement.dataset.index;
            comments[index].isEditor = true;

            if (buttonEditCommentElement.textContent === 'Редактировать') {
                const commentElement = document.querySelectorAll('.comment-body')[index];

                commentElement.innerHTML = `
                <div class="edit-form">
                    <textarea class="edit-form-text" rows="4">${comments[index].text}</textarea>
                    </div>`;

                buttonEditCommentElement.textContent = 'Сохранить';

            } else {
                const inputTextElement = document.querySelector(".edit-form-text");

                if (inputTextElement.value !== "") {
                    comments[index].comment = inputTextElement.value;
                    renderCommentsList();
                }
            }
        })
    }
};


// Обработчик ответа на комментарий

const initReplyCommentListener = () => {
    const commentsList = document.querySelectorAll('.comment');

    for (const comment of commentsList) {
        comment.addEventListener('click', () => {
            const index = comment.dataset.index;

            if (comments[index].isEditor === true) return;

            inputTextElement.value = `START_QUOTE ${comments[index].name}: ${comments[index].text} END_QUOTE`;
        })
    }
}


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

console.log("Modules work!");