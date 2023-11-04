import { addNewComment } from './addNewComment.js'


export const initButtonSendCommentListener = ({ token }) => {

    const buttonElement = document.querySelector(".add-form-button");
    const inputTextElement = document.querySelector(".add-form-text");


    inputTextElement.addEventListener("keyup", (enter) => {

        if (enter.code === 'Enter' && inputTextElement.value !== "") {
            const commentFromInput = inputTextElement.value;

            addNewComment({ token, commentFromInput });
            buttonElement.disabled = true;
        }
    });


    document.addEventListener("input", () => {

        if (inputTextElement.value !== "") {
            buttonElement.disabled = false;
        } else {
            buttonElement.disabled = true;
        }
    });

    buttonElement.addEventListener("click", () => {
        const commentFromInput = inputTextElement.value;

        addNewComment({ token, commentFromInput });
        buttonElement.disabled = true;
    });

}
