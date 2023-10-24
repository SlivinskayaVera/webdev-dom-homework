const URL = 'https://wedev-api.sky.pro/api/v1/slivaa/comments';

const getFetchResponse = () => {
    return fetch(URL, {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            else {
                return response.json()
            }
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

