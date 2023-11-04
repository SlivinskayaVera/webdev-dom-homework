const apiComments = 'https://wedev-api.sky.pro/api/v2/vera/comments';
const apiUsers = 'https://wedev-api.sky.pro/api/user';


const getFetchResponse = () => {
    return fetch(apiComments, {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            else { throw new Error('Нет соединения') }
        })

};


const postCommentByFetch = ({textUser, token}) => {

    return fetch(apiComments, {
        method: 'POST',
        body: JSON.stringify({
            text: textUser,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
          }
    })
    .then((response) => {

        if (response.status === 400) {
            throw new Error('Короткий комментарий или имя');
        } else if (response.status === 500) {
            throw new Error('Сервер сломался');
        }

    })
};

const delCommentByFetch = ({ID, token}) => {

    return fetch(`${apiComments}/${ID}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
          }
    })
};


const addLikeByFetch = ({ID, token}) => {

    return fetch(`${apiComments}/${ID}/toggle-like`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
          }
    })
    .then((response) => {
        return response.json();
    })
}; 

const registerUser = ({login, password, name}) => {
    return fetch(apiUsers, {
        method: 'POST',
        body: JSON.stringify({
            login,
            name,
            password
        })
    })
    .then((response) => {

        if (response.status === 400) {
            throw new Error('пользователь с таким логином уже существует');
        }
        return response.json();
    })
};

const enterUser = ({login, password}) => {
    return fetch(`${apiUsers}/login`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password
        })
    })
    .then((response) => {

        if (response.status === 400) {
            throw new Error('передан неправильный логин или пароль');
        }
        return response.json();
    })
}


export { getFetchResponse, postCommentByFetch, enterUser, registerUser, delCommentByFetch, addLikeByFetch };