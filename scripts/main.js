import { getCommentsByFetchResponse } from './getCommentsRenderPage.js'


export let comments = [];
export let userData;

const myStorage = window.localStorage;

// старт начальной страницы
getCommentsByFetchResponse({ comments });


console.log("Modules work!");


// добавить удаление коммента
// добавить локал сторедж

