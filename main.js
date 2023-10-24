"use strict";

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


const getFetchResponse = () => {
    loadingCommentsElement.classList.add("display-flex");

    return fetch('https://wedev-api.sky.pro/api/v1/slivaaa/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            else {
                return response.json()
            }
        })
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
            renderComments();
        })
        .then((data) => {
            loadingCommentsElement.classList.remove("display-flex");
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался') {
                alert('Сервер сломался, попробуй позже');
            }
            alert('Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже')
        })
};

getFetchResponse();



// Добавление нового коммента

buttonElement.addEventListener("click", () => {
    addNewComment();
    buttonElement.disabled = true;
});

const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("START_QUOTE", '<div class="quote">').replaceAll("END_QUOTE", '</div>');
};

const addTodo = (textUser, nameUser) => {
    return fetch('https://wedev-api.sky.pro/api/v1/slivaaa/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: textUser,
            name: nameUser,
            forceError: true
        })
    })
};

const postComment = (textUser, nameUser) => {
    addTodo(textUser, nameUser)
        .then((response) => {

            if (response.status === 400) {
                throw new Error('Короткий комментарий или имя');
            } else if (response.status === 500) {
                throw new Error('Сервер сломался');
            }

            getFetchResponse();

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

                postComment(textUser, nameUser);
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
    renderComments();
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

                renderComments();
            });
        })
    }
};

initButtonLikeListeners();



// Обработчик редактирования коммента

const initButtonEditCommentListener = () => {
    const buttonsEditCommentElement = document.querySelectorAll(".button-edit-comment");

    for (const buttonEditCommentElement of buttonsEditCommentElement) {
        buttonEditCommentElement.addEventListener("click", () => {

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
                    renderComments();
                }
            }
        })
    }
};

initButtonEditCommentListener();



// Обработчик ответа на комментарий

const initReplyCommentListener = () => {
    const commentsList = document.querySelectorAll('.comment');
    const inputTextElement = document.querySelector('.add-form-text');


    for (const comment of commentsList) {
        comment.addEventListener('click', () => {
            const index = comment.dataset.index;
            if (comments[index].isEditor === true) return;
            console.log(comment);
            inputTextElement.value = `START_QUOTE ${comments[index].name}: ${comments[index].text} END_QUOTE`;
        })
    }
}

// initReplyCommentListener();


// Рендер функция

const renderComments = () => {

    loadingFormElement.classList.remove("display-flex");
    inputFormElement.classList.remove("display-hidden");

    const commentsHTML = comments.map((comment, index) => {

        const correctDate = new Date(comment.date).toLocaleString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false }).replace(',', '');


        return `<li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${comment.name}</div>
                        <div class="comment-date">${correctDate}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text" data-id="${comment.id}">
                            ${comment.text}
                        </div> 
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button data-index="${index}" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
                        </div>
                    </div>
                        <div class="edit-form-row">
                            <button class="button-edit-comment" data-index="${index}">Редактировать</button>
                            </div>
                            </li>`
    }).join("");


    listElement.innerHTML = commentsHTML;
    initButtonEditCommentListener();
    initReplyCommentListener();
    initButtonLikeListeners();

};
renderComments();

console.log("It works!");

