const appHtml = document.querySelector('.container');
const inputTextElement = document.querySelector(".add-form-text");



const renderPage = ({comments, userdata}) => {

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


    const renderPage = `
        <div class="loading-comments">
            <p>Комментарии загружаются...</p>
        </div>
        <ul class="comments">${commentsHTML}</ul>
        <div class="loading">
            <p>Комментарий загружается...</p>
        </div>
        <div class="add-form">
            <input id="input-name" type="text" class="add-form-name" value=${userdata.name} />
            <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button" disabled="true">Написать</button>
            </div>
        </div>`;

    appHtml.innerHTML = renderPage;


    // Обработчики для кнопки Написать

const buttonElement = document.querySelector(".add-form-button");


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

buttonElement.addEventListener("click", () => {
    addNewComment();
    buttonElement.disabled = true;
});

document.addEventListener("input", () => {
    if (inputNameElement.value !== "" && inputTextElement.value !== "") {
        buttonElement.disabled = false;
    } else {
        buttonElement.disabled = true;
    }
});

};



export { renderPage };