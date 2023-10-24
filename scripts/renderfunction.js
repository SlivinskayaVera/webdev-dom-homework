const renderComments = () => {

    const listElement = document.querySelector(".comments");

    loadingFormElement.classList.remove("display-flex");
    inputFormElement.classList.remove("display-hidden");

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


    listElement.innerHTML = commentsHTML;
    initButtonEditCommentListener();
    initReplyCommentListener();
    initButtonLikeListeners();

};

export { renderComments };