import { renderComments } from './renderComments.js';
// import { comments } from './main.js'


const renderPage = ({ userData, token, comments }) => {
    
    const commentsHTML = renderComments({ comments });
    const appHtml = document.querySelector('.container');

    const renderPageHTML = `
        <div class="loading-comments">
            <p>Комментарии загружаются...</p>
        </div>
        <ul class="comments">${commentsHTML}</ul>
        <div class="loading">
            <p>Комментарий загружается...</p>
        </div>
        <div class="authorization ${token ? 'display-hidden' : 'display-flex'}">
            <p>Чтобы добавить комментарий, <a class="authorizationButton" href="#">авторизуйтесь</a> .</p>
        </div>
        <div class="add-form ${token ? 'display-flex' : 'display-hidden'}">
            <input id="input-name" type="text" class="add-form-name" value='${userData.name}' disabled='true'/>
            <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>`;
        
        return appHtml.innerHTML = renderPageHTML;
    };

export { renderPage };