import { getCommentsByFetchResponse } from "./getCommentsRenderPage.js";
import { addLikeByFetch } from "./api.js";

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export const initButtonLikeListeners = ({ comments, token, userData }) => {
    const buttonsLikeElement = document.querySelectorAll(".like-button");

    for (const buttonLikeElement of buttonsLikeElement) {
        buttonLikeElement.addEventListener("click", (event) => {
            event.stopPropagation();

            if (!token) {
                buttonLikeElement.classList.remove("-loading-like");
                return;
            }

            buttonLikeElement.classList.add("-loading-like");

            delay(1000).then(() => {
                let index = buttonLikeElement.dataset.index;
                const comment = comments[index];
                const ID = comment.id;

                addLikeByFetch({ ID, token }).then(() => {
                    getCommentsByFetchResponse({ comments, token, userData });
                    buttonLikeElement.classList.remove("-loading-like");
                });
            });
        });
    }
};
