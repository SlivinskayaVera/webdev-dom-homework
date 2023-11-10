import { getCommentsByFetchResponse } from "./getCommentsRenderPage.js";

export let comments = [];
export let userData;

// старт начальной страницы
getCommentsByFetchResponse({ comments });

console.log("Modules work!");

// добавить локал сторедж
