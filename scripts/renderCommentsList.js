import { renderComments } from './renderComments.js';
import { initReplyCommentListener } from './replyсomment.js';
import { initButtonLikeListeners } from './buttonlike.js';


// Рендер комментов

export function renderCommentsList({ comments }) {

    const listElement = document.querySelector(".comments");
    const inputFormElement = document.querySelector(".add-form");
    const loadingFormElement = document.querySelector(".loading");

    loadingFormElement.classList.remove("display-flex");
    inputFormElement.classList.remove("display-hidden");

    listElement.innerHTML = renderComments({ comments });

    initReplyCommentListener();
    initButtonLikeListeners({ comments });

};