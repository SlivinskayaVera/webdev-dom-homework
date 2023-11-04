import { getCommentsByFetchResponse } from './getCommentsRenderPage.js'
import { initButtonAuthorizationListener } from './authorizationButton.js'


export let comments = [];
export let userData;

const myStorage = window.localStorage;
// myStorage.setItem("token", userData.token)
// let token = myStorage.getItem('token')


// старт начальной страницы
getCommentsByFetchResponse({ comments });


// обработчик на ссылку авторизации 
initButtonAuthorizationListener({comments});


console.log("Modules work!");


// не грузятся комменты после авторизации
// лайки проставлются без авторизации
// добавить удаление
// добавить локал сторедж

