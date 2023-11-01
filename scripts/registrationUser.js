import { registerUser } from './api.js';
import { drawEnterPage } from './main.js'

const newUser = ({ comments, userData, appHtml }) => {
    const registerName = document.getElementById('registerName');
    const registerLogin = document.getElementById('registerLogin');
    const registerPassword = document.getElementById('registerPassword');

    registerUser({
        login: registerLogin.value,
        name: registerName.value,
        password: registerPassword.value
    })
        .then((responseData) => {
            return userData = responseData.user;
        })
        .then(() => {
            drawEnterPage();
        })
        .catch((error) => {
            if (error.message === 'пользователь с таким логином уже существует') {
                alert('Вы уже зарегистрированы, попробуйте залогиниться в системе');
            }
        });
}

export {newUser}