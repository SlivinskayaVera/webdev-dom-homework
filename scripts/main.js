import { getCommentsByFetchResponse } from './getCommentsRenderPage.js'


export let comments = [];
export let userData;

const myStorage = window.localStorage;

// старт начальной страницы
getCommentsByFetchResponse({ comments });


console.log("Modules work!");


// при отправке комментариев странице перезагружается и надо снова авторизоваться
// лайки проставлются без авторизации
// добавить удаление
// добавить локал сторедж

