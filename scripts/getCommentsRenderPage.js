import { getFetchResponse } from "./api.js";
import { renderPage } from "./renderPage.js";

export const getCommentsByFetchResponse = ({ comments, userData, token }) => {
    try {
        const loadingCommentsElement =
            document.querySelector(".loading-comments");
        loadingCommentsElement.classList.add("display-flex");
    } catch {
        console.log("Не удалось обнаружить селекторы");
    }

    getFetchResponse({ token })
        .then((responseComments) => {
            const appComments = responseComments.comments.map((comment) => {
                return {
                    id: comment.id,
                    name: comment.author.name,
                    login: comment.author.login,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                    isEditor: false,
                };
            });

            comments = appComments;
            renderPage({ comments, userData, token });
        })
        .then(() => {
            try {
                const loadingCommentsElement =
                    document.querySelector(".loading-comments");
                loadingCommentsElement.classList.remove("display-flex");
            } catch {
                console.log("Не удалось обнаружить селекторы");
            }
        })
        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
            }
            alert(
                "Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже",
            );
        });
};
