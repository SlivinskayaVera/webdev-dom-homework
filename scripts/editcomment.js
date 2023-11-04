import { comments } from './main.js'
import { renderPage } from './renderPage.js'

const initButtonEditCommentListener = () => {
    const buttonsEditCommentElement = document.querySelectorAll(".button-edit-comment");

    for (const buttonEditCommentElement of buttonsEditCommentElement) {
        buttonEditCommentElement.addEventListener("click", (event) => {

            event.stopPropagation();

            const index = buttonEditCommentElement.dataset.index;
            const commentElement = document.querySelectorAll('.comment-body')[index];

            buttonEditCommentElement.textContent = 'Сохранить';
            comments[index].isEditor = true;

            commentElement.innerHTML = `
            <div class="edit-form">
                <textarea class="edit-form-text" rows="4">${comments[index].text}</textarea>
                </div>`;

            buttonEditCommentElement.addEventListener("click", () => {

                const inputTextElement = document.querySelector(".edit-form-text");

                if (inputTextElement.value !== "") {

                    comments[index].text = inputTextElement.value;
                    comments[index].isEditor = false;
                    buttonEditCommentElement.textContent = 'Редактировать';

                    renderPage({comments});
                }

            })

        })
    }
};

export { initButtonEditCommentListener }