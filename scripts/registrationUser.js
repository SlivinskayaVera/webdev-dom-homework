import { registerUser } from './api.js';
import { comments } from './main.js'
import { renderPage } from './renderPage.js';
import { initButtonLikeListeners } from './buttonlike.js';
import { initButtonSendCommentListener } from './buttonElementListeners.js';
import { initReplyCommentListener } from './replyсomment.js';

const newUser = () => {
    const registerName = document.getElementById('registerName');
    const registerLogin = document.getElementById('registerLogin');
    const registerPassword = document.getElementById('registerPassword');

    let userData = registerUser({
        login: registerLogin.value,
        name: registerName.value,
        password: registerPassword.value
    })
        .then((responseData) => {
            return userData = responseData.user;
        })
        .then(() => {
            renderPage({ comments, userData });
            const token = userData.token;

            initButtonSendCommentListener({ token });
            initReplyCommentListener();
            initButtonLikeListeners({ comments });
        })
        .catch((error) => {
            if (error.message === 'пользователь с таким логином уже существует') {
                alert('Вы уже зарегистрированы, попробуйте залогиниться в системе');
            }
        });
}

export { newUser }