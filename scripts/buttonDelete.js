import { delCommentByFetch } from "./api.js";
import { getCommentsByFetchResponse } from "./getCommentsRenderPage.js";

export const initButtonDeleteListener = ({ comments, token, userData }) => {
    const buttonsDeleteList = document.querySelectorAll(".delete-button");

    for (const buttonDeleteElement of buttonsDeleteList) {
        buttonDeleteElement.addEventListener("click", (event) => {
            if (!token) return;

            event.stopPropagation();

            let index = buttonDeleteElement.dataset.index;
            const comment = comments[index];
            const ID = comment.id;

            delCommentByFetch({ ID, token }).then(() => {
                getCommentsByFetchResponse({ comments, token, userData });
            });
        });
    }
};
