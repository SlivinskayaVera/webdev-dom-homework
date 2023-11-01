import {addNewComment} from './addNewComment.js'

const buttonElement = document.querySelector(".add-form-button");
const inputNameElement = document.getElementById("input-name");
const inputTextElement = document.querySelector(".add-form-text");

const initButtonSendCommentListener = ({token}) => {

    
    inputTextElement.addEventListener("keyup", (enter) => {
        
        if (enter.code === 'Enter' && inputNameElement.value !== "" && inputTextElement.value !== "") {
            addNewComment({ token });
            buttonElement.disabled = true;
        }
    });
    
    inputNameElement.addEventListener("keyup", (enter) => {
        
        if (enter.code === 'Enter' && inputNameElement.value !== "" && inputTextElement.value !== "") {
            addNewComment({ token });
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

    buttonElement.addEventListener("click", () => {
    
        addNewComment({ token });
        buttonElement.disabled = true;
    });
    
}

export {initButtonSendCommentListener}