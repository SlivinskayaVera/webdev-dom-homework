import { registerUser } from './api.js';
import { renderPage } from './renderPage.js'

const newUser = ({comments}) => {
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
            const token = userData.token;
            console.log(comments);
            renderPage({ comments, userData, token });
        })
        .catch((error) => {
            if (error.message === 'пользователь с таким логином уже существует') {
                alert('Вы уже зарегистрированы, попробуйте залогиниться в системе');
            }
        });
}

export { newUser }