import { getFetchResponse } from './api.js';
import { renderCommentsList } from './renderCommentsList.js';


export const getCommentsByFetchResponse = ({comments, userData}) => {
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
            renderCommentsList({ comments });
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