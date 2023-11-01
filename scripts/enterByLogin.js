import { enterUser } from './api.js';
import { renderPage } from './renderPage.js';


const enterByLogin = ({comments, userData, appHtml}) => {

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
                appHtml.innerHTML = renderPage({ comments, userData });
            })
            .catch((error) => {
                if (error.message === 'передан неправильный логин или пароль') {
                    alert('Вы ввели неверный пароль или логин, попробуйте еще раз');
                }
            });
    }
}

export {enterByLogin}