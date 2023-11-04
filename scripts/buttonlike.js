import { renderCommentsList } from './renderCommentsList.js'

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

export const initButtonLikeListeners = ({ comments }) => {

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

                renderCommentsList({comments});
            });
        })
    }
};
