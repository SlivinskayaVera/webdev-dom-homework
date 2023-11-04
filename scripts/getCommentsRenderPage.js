import { getFetchResponse } from './api.js';
import { renderPage } from './renderPage.js';


export const getCommentsByFetchResponse = ({comments, userData, token}) => {
    const loadingCommentsElement = document.querySelector(".loading-comments");
    loadingCommentsElement.classList.add("display-flex");


    getFetchResponse()
        .then((responseComments) => {
            const appComments = responseComments.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                    isEditor: false
                };
            });

            comments = appComments;
            renderPage({ comments, userData, token });
        })
        .then(() => {
            loadingCommentsElement.classList.remove("display-flex");
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался') {
                alert('Сервер сломался, попробуй позже');
            }
            alert('Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже')
        })
};