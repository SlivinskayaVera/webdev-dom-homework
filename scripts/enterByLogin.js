import { enterUser } from './api.js';
import { renderPage } from './renderPage.js';
import { initButtonLikeListeners } from './buttonlike.js';
import { initButtonSendCommentListener } from './buttonElementListeners.js';
import { initReplyCommentListener } from './replyсomment.js';



const enterByLogin = ({ comments, userData }) => {

    const enterLogin = document.getElementById('enterLogin');
    const enterPassword = document.getElementById('enterPassword');


    if (enterLogin !== '' && enterPassword !== '') {
        enterUser({
            login: enterLogin.value,
            password: enterPassword.value,
        })
            .then((responseData) => {
                return userData = responseData.user;
            })
            .then(() => {
                renderPage({ comments, userData });
                const token = userData.token;
                initButtonSendCommentListener({ token });
                initReplyCommentListener();
                initButtonLikeListeners();
                
            })
            .catch((error) => {
                if (error.message === 'передан неправильный логин или пароль') {
                    alert('Вы ввели неверный пароль или логин, попробуйте еще раз');
                }
            });
    }
}

export { enterByLogin }