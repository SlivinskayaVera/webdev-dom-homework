import { enterUser } from "./api.js";
import { getCommentsByFetchResponse } from "./getCommentsRenderPage.js";

const enterByLogin = ({ comments, userData }) => {
    const enterLogin = document.getElementById("enterLogin");
    const enterPassword = document.getElementById("enterPassword");

    if (enterLogin !== "" && enterPassword !== "") {
        enterUser({
            login: enterLogin.value,
            password: enterPassword.value,
        })
            .then((responseData) => {
                return (userData = responseData.user);
            })
            .then(() => {
                const token = userData.token;
                getCommentsByFetchResponse({ comments, userData, token });
            })
            .catch((error) => {
                if (error.message === "передан неправильный логин или пароль") {
                    alert(
                        "Вы ввели неверный пароль или логин, попробуйте еще раз",
                    );
                }
            });
    }
};

export { enterByLogin };
