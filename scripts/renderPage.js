import { renderComments } from "./renderComments.js";
import { initReplyCommentListener } from "./replyсomment.js";
import { initButtonLikeListeners } from "./buttonlike.js";
import { initButtonAuthorizationListener } from "./authorizationButton.js";
import { initButtonSendCommentListener } from "./buttonElementListeners.js";
import { initButtonDeleteListener } from "./buttonDelete.js";

export function renderPage({ comments, userData, token }) {
    const appHtml = document.querySelector(".container");

    try {
        const inputFormElement = document.querySelector(".add-form");
        const loadingFormElement = document.querySelector(".loading");

        loadingFormElement.classList.remove("display-flex");
        inputFormElement.classList.remove("display-hidden");
    } catch {
        console.log("Не удалось обнаружить селекторы");
    }

    const commentsHTML = renderComments({ comments, token, userData });

    const renderPageHTML = `
        <div class="loading-comments">
            <p>Комментарии загружаются...</p>
        </div>
        <ul class="comments">${commentsHTML}</ul>
        <div class="loading">
            <p>Комментарий загружается...</p>
        </div>
        <div class="authorization ${token ? "display-hidden" : "display-flex"}">
            <p>Чтобы добавить комментарий, <a class="authorizationButton" href="#">авторизуйтесь</a> .</p>
        </div>
        <div class="add-form ${token ? "display-flex" : "display-hidden"}">
            <input id="input-name" type="text" class="add-form-name" value='${
                userData ? userData.name : ""
            }' disabled='true'/>
            <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>`;

    appHtml.innerHTML = renderPageHTML;

    initButtonAuthorizationListener({ comments });
    initReplyCommentListener({ comments, token, userData });
    initButtonLikeListeners({ comments, token, userData });
    initButtonSendCommentListener({ token, userData });
    initButtonDeleteListener({ comments, token, userData });
}
