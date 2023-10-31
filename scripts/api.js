const URL = 'https://wedev-api.sky.pro/api/v1/sliva/comments';

const getFetchResponse = () => {
    return fetch(URL, {
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


const postCommentByFetch = ({textFromUser, nameFromUser}) => {

    return fetch(URL, {
        method: 'POST',
        body: JSON.stringify({
            text: textFromUser,
            name: nameFromUser,
            forceError: true
        })
    })
    .then((response) => {

        if (response.status === 400) {
            throw new Error('Короткий комментарий или имя');
        } else if (response.status === 500) {
            throw new Error('Сервер сломался');
        }

    })
};


export { getFetchResponse, postCommentByFetch };