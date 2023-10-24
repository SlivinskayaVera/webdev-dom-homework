import { comments } from './main.js'

const inputTextElement = document.querySelector(".add-form-text");

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

export { initReplyCommentListener }