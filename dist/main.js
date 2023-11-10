/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/addNewComment.js":
/*!**********************************!*\
  !*** ./scripts/addNewComment.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addNewComment: () => (/* binding */ addNewComment)\n/* harmony export */ });\n/* harmony import */ var _sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sanitizeHtml.js */ \"./scripts/sanitizeHtml.js\");\n/* harmony import */ var _getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCommentsRenderPage.js */ \"./scripts/getCommentsRenderPage.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./main.js */ \"./scripts/main.js\");\n// Добавление нового коммента\n\n\n\n\n\n\nconst addNewComment = ({ token, commentFromInput, userData }) => {\n    const inputFormElement = document.querySelector(\".add-form\");\n    const loadingFormElement = document.querySelector(\".loading\");\n\n    const textUser = (0,_sanitizeHtml_js__WEBPACK_IMPORTED_MODULE_0__.sanitizeHtml)(commentFromInput);\n\n    loadingFormElement.classList.add(\"display-flex\");\n    inputFormElement.classList.add(\"display-hidden\");\n\n    postComment({ textUser, token, userData });\n};\n\nconst postComment = ({ textUser, token, userData }) => {\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_2__.postCommentByFetch)({ textUser, token })\n        .then(() => {\n            (0,_getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsByFetchResponse)({ comments: _main_js__WEBPACK_IMPORTED_MODULE_3__.comments, token, userData });\n\n            const inputTextElement = document.querySelector(\".add-form-text\");\n            inputTextElement.value = \"\";\n        })\n        .catch((error) => {\n            const inputFormElement = document.querySelector(\".add-form\");\n            const loadingFormElement = document.querySelector(\".loading\");\n\n            loadingFormElement.classList.remove(\"display-flex\");\n            inputFormElement.classList.remove(\"display-hidden\");\n\n            if (error.message === \"Короткий комментарий или имя\") {\n                alert(\n                    \"Вы ввели слишком короткое имя или комментарий, попробуйте еще раз\",\n                );\n                return;\n            } else if (error.message === \"Сервер сломался\") {\n                postComment({ textUser, token });\n                console.log(\"пробую отправить запрос на сервер\");\n            } else\n                alert(\n                    \"Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже\",\n                );\n        });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/addNewComment.js?");

/***/ }),

/***/ "./scripts/api.js":
/*!************************!*\
  !*** ./scripts/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addLikeByFetch: () => (/* binding */ addLikeByFetch),\n/* harmony export */   delCommentByFetch: () => (/* binding */ delCommentByFetch),\n/* harmony export */   enterUser: () => (/* binding */ enterUser),\n/* harmony export */   getFetchResponse: () => (/* binding */ getFetchResponse),\n/* harmony export */   postCommentByFetch: () => (/* binding */ postCommentByFetch),\n/* harmony export */   registerUser: () => (/* binding */ registerUser)\n/* harmony export */ });\nconst apiComments = \"https://wedev-api.sky.pro/api/v2/vera/comments\";\nconst apiUsers = \"https://wedev-api.sky.pro/api/user\";\n\nconst getFetchResponse = ({ token }) => {\n    return fetch(apiComments, {\n        method: \"GET\",\n        headers: {\n            Authorization: `Bearer ${token}`,\n        },\n    }).then((response) => {\n        if (response.status === 200) {\n            return response.json();\n        } else if (response.status === 500) {\n            throw new Error(\"Сервер сломался\");\n        } else {\n            throw new Error(\"Нет соединения\");\n        }\n    });\n};\n\nconst postCommentByFetch = ({ textUser, token }) => {\n    return fetch(apiComments, {\n        method: \"POST\",\n        body: JSON.stringify({\n            text: textUser,\n        }),\n        headers: {\n            Authorization: `Bearer ${token}`,\n        },\n    }).then((response) => {\n        if (response.status === 400) {\n            throw new Error(\"Короткий комментарий или имя\");\n        } else if (response.status === 500) {\n            throw new Error(\"Сервер сломался\");\n        }\n    });\n};\n\nconst delCommentByFetch = ({ ID, token }) => {\n    return fetch(`${apiComments}/${ID}`, {\n        method: \"DELETE\",\n        headers: {\n            Authorization: `Bearer ${token}`,\n        },\n    });\n};\n\nconst addLikeByFetch = ({ ID, token }) => {\n    return fetch(`${apiComments}/${ID}/toggle-like`, {\n        method: \"POST\",\n        headers: {\n            Authorization: `Bearer ${token}`,\n        },\n    }).then((response) => {\n        return response.json();\n    });\n};\n\nconst registerUser = ({ login, password, name }) => {\n    return fetch(apiUsers, {\n        method: \"POST\",\n        body: JSON.stringify({\n            login,\n            name,\n            password,\n        }),\n    }).then((response) => {\n        if (response.status === 400) {\n            throw new Error(\"пользователь с таким логином уже существует\");\n        }\n        return response.json();\n    });\n};\n\nconst enterUser = ({ login, password }) => {\n    return fetch(`${apiUsers}/login`, {\n        method: \"POST\",\n        body: JSON.stringify({\n            login,\n            password,\n        }),\n    }).then((response) => {\n        if (response.status === 400) {\n            throw new Error(\"передан неправильный логин или пароль\");\n        }\n        return response.json();\n    });\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/api.js?");

/***/ }),

/***/ "./scripts/authorizationButton.js":
/*!****************************************!*\
  !*** ./scripts/authorizationButton.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initButtonAuthorizationListener: () => (/* binding */ initButtonAuthorizationListener)\n/* harmony export */ });\n/* harmony import */ var _drawEnterPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawEnterPage.js */ \"./scripts/drawEnterPage.js\");\n\n\nconst initButtonAuthorizationListener = ({ comments }) => {\n    const appHtml = document.querySelector(\".container\");\n    const buttonForAuthorization = document.querySelector(\n        \".authorizationButton\",\n    );\n\n    buttonForAuthorization.addEventListener(\"click\", () => {\n        (0,_drawEnterPage_js__WEBPACK_IMPORTED_MODULE_0__.drawEnterPage)({ comments, appHtml });\n    });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/authorizationButton.js?");

/***/ }),

/***/ "./scripts/buttonDelete.js":
/*!*********************************!*\
  !*** ./scripts/buttonDelete.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initButtonDeleteListener: () => (/* binding */ initButtonDeleteListener)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n/* harmony import */ var _getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCommentsRenderPage.js */ \"./scripts/getCommentsRenderPage.js\");\n\n\n\nconst initButtonDeleteListener = ({ comments, token, userData }) => {\n    const buttonsDeleteList = document.querySelectorAll(\".delete-button\");\n\n    for (const buttonDeleteElement of buttonsDeleteList) {\n        buttonDeleteElement.addEventListener(\"click\", (event) => {\n            if (!token) return;\n\n            event.stopPropagation();\n\n            let index = buttonDeleteElement.dataset.index;\n            const comment = comments[index];\n            const ID = comment.id;\n\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.delCommentByFetch)({ ID, token }).then(() => {\n                (0,_getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsByFetchResponse)({ comments, token, userData });\n            });\n        });\n    }\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/buttonDelete.js?");

/***/ }),

/***/ "./scripts/buttonElementListeners.js":
/*!*******************************************!*\
  !*** ./scripts/buttonElementListeners.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initButtonSendCommentListener: () => (/* binding */ initButtonSendCommentListener)\n/* harmony export */ });\n/* harmony import */ var _addNewComment_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./addNewComment.js */ \"./scripts/addNewComment.js\");\n\n\nconst initButtonSendCommentListener = ({ token, userData }) => {\n    const buttonElement = document.querySelector(\".add-form-button\");\n    const inputTextElement = document.querySelector(\".add-form-text\");\n\n    inputTextElement.addEventListener(\"keyup\", (enter) => {\n        if (enter.code === \"Enter\" && inputTextElement.value !== \"\") {\n            const commentFromInput = inputTextElement.value;\n\n            (0,_addNewComment_js__WEBPACK_IMPORTED_MODULE_0__.addNewComment)({ token, commentFromInput, userData });\n            buttonElement.disabled = true;\n        }\n    });\n\n    document.addEventListener(\"input\", () => {\n        if (inputTextElement.value !== \"\") {\n            buttonElement.disabled = false;\n        } else {\n            buttonElement.disabled = true;\n        }\n    });\n\n    buttonElement.addEventListener(\"click\", () => {\n        const commentFromInput = inputTextElement.value;\n\n        (0,_addNewComment_js__WEBPACK_IMPORTED_MODULE_0__.addNewComment)({ token, commentFromInput, userData });\n        buttonElement.disabled = true;\n    });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/buttonElementListeners.js?");

/***/ }),

/***/ "./scripts/buttonlike.js":
/*!*******************************!*\
  !*** ./scripts/buttonlike.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initButtonLikeListeners: () => (/* binding */ initButtonLikeListeners)\n/* harmony export */ });\n/* harmony import */ var _getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCommentsRenderPage.js */ \"./scripts/getCommentsRenderPage.js\");\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n\n\n\nfunction delay(interval = 300) {\n    return new Promise((resolve) => {\n        setTimeout(() => {\n            resolve();\n        }, interval);\n    });\n}\n\nconst initButtonLikeListeners = ({ comments, token, userData }) => {\n    const buttonsLikeElement = document.querySelectorAll(\".like-button\");\n\n    for (const buttonLikeElement of buttonsLikeElement) {\n        buttonLikeElement.addEventListener(\"click\", (event) => {\n            event.stopPropagation();\n\n            if (!token) {\n                buttonLikeElement.classList.remove(\"-loading-like\");\n                return;\n            }\n\n            buttonLikeElement.classList.add(\"-loading-like\");\n\n            delay(1000).then(() => {\n                let index = buttonLikeElement.dataset.index;\n                const comment = comments[index];\n                const ID = comment.id;\n\n                (0,_api_js__WEBPACK_IMPORTED_MODULE_1__.addLikeByFetch)({ ID, token }).then(() => {\n                    (0,_getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_0__.getCommentsByFetchResponse)({ comments, token, userData });\n                    buttonLikeElement.classList.remove(\"-loading-like\");\n                });\n            });\n        });\n    }\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/buttonlike.js?");

/***/ }),

/***/ "./scripts/drawEnterPage.js":
/*!**********************************!*\
  !*** ./scripts/drawEnterPage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawEnterPage: () => (/* binding */ drawEnterPage)\n/* harmony export */ });\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.js */ \"./scripts/main.js\");\n/* harmony import */ var _drawRegistrationPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./drawRegistrationPage.js */ \"./scripts/drawRegistrationPage.js\");\n/* harmony import */ var _enterByLogin_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enterByLogin.js */ \"./scripts/enterByLogin.js\");\n\n\n\n\n// кнопка войти: иницализация и обработчик на вход в учетку\n\nconst initButtonEnterListener = ({ comments }) => {\n    const enterFormButton = document.querySelector(\".enter-form-button\");\n\n    enterFormButton.addEventListener(\"click\", () => {\n        (0,_enterByLogin_js__WEBPACK_IMPORTED_MODULE_2__.enterByLogin)({ comments, userData: _main_js__WEBPACK_IMPORTED_MODULE_0__.userData });\n    });\n};\n\nconst drawEnterPage = ({ appHtml, comments }) => {\n    const enterFormHTML = `\n        <div class=\"enter-form\">\n            <h3 class=\"enter-form-header\">Форма входа</h3>\n            <input id=\"enterLogin\" type=\"text\" class=\"enter-form-input\" placeholder=\"Введите логин\" />\n            <input id=\"enterPassword\" type=\"password\" class=\"enter-form-input\" placeholder=\"Введите пароль\" />\n\n            <button class=\"enter-form-button\">Войти</button>\n            <a class=\"register-button\" href=\"#\">Зарегистрироваться</a>\n        </div>`;\n\n    appHtml.innerHTML = enterFormHTML;\n\n    initButtonEnterListener({ comments });\n\n    const registerButton = document.querySelector(\".register-button\");\n\n    registerButton.addEventListener(\"click\", () => {\n        (0,_drawRegistrationPage_js__WEBPACK_IMPORTED_MODULE_1__.drawRegistrationPage)({ comments });\n    });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/drawEnterPage.js?");

/***/ }),

/***/ "./scripts/drawRegistrationPage.js":
/*!*****************************************!*\
  !*** ./scripts/drawRegistrationPage.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   drawRegistrationPage: () => (/* binding */ drawRegistrationPage)\n/* harmony export */ });\n/* harmony import */ var _drawEnterPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawEnterPage.js */ \"./scripts/drawEnterPage.js\");\n/* harmony import */ var _registrationUser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./registrationUser.js */ \"./scripts/registrationUser.js\");\n// рисует форму регистрации\n\n\n\n\n// кнопка регистрации\n\nconst initButtonRegisterListener = ({ comments }) => {\n    const registerFormButton = document.querySelector(\".register-form-button\");\n\n    registerFormButton.addEventListener(\"click\", () => {\n        (0,_registrationUser_js__WEBPACK_IMPORTED_MODULE_1__.newUser)({ comments });\n    });\n};\n\nconst drawRegistrationPage = ({ comments }) => {\n    const appHtml = document.querySelector(\".container\");\n\n    const registerForm = `\n    <div class=\"register-form\">\n        <h3 class=\"register-form-header\">Форма регистрации</h3>\n        <input id=\"registerName\" type=\"text\" class=\"register-form-input\" placeholder=\"Введите имя\" />\n        <input id=\"registerLogin\" type=\"text\" class=\"register-form-input\" placeholder=\"Введите логин\" />\n        <input id=\"registerPassword\" type=\"password\" class=\"register-form-input\" placeholder=\"Введите пароль\" />\n\n        <button class=\"register-form-button\">Зарегистрироваться</button>\n        <a class=\"enter-button\" href=\"#\">Войти</a>\n    </div>`;\n\n    appHtml.innerHTML = registerForm;\n\n    initButtonRegisterListener({ comments });\n\n    const enterFormButton = document.querySelector(\".enter-button\");\n\n    enterFormButton.addEventListener(\"click\", () => {\n        (0,_drawEnterPage_js__WEBPACK_IMPORTED_MODULE_0__.drawEnterPage)({ appHtml, comments });\n    });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/drawRegistrationPage.js?");

/***/ }),

/***/ "./scripts/enterByLogin.js":
/*!*********************************!*\
  !*** ./scripts/enterByLogin.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   enterByLogin: () => (/* binding */ enterByLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n/* harmony import */ var _getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getCommentsRenderPage.js */ \"./scripts/getCommentsRenderPage.js\");\n\n\n\nconst enterByLogin = ({ comments, userData }) => {\n    const enterLogin = document.getElementById(\"enterLogin\");\n    const enterPassword = document.getElementById(\"enterPassword\");\n\n    if (enterLogin !== \"\" && enterPassword !== \"\") {\n        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.enterUser)({\n            login: enterLogin.value,\n            password: enterPassword.value,\n        })\n            .then((responseData) => {\n                return (userData = responseData.user);\n            })\n            .then(() => {\n                const token = userData.token;\n                (0,_getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_1__.getCommentsByFetchResponse)({ comments, userData, token });\n            })\n            .catch((error) => {\n                if (error.message === \"передан неправильный логин или пароль\") {\n                    alert(\n                        \"Вы ввели неверный пароль или логин, попробуйте еще раз\",\n                    );\n                }\n            });\n    }\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/enterByLogin.js?");

/***/ }),

/***/ "./scripts/getCommentsRenderPage.js":
/*!******************************************!*\
  !*** ./scripts/getCommentsRenderPage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCommentsByFetchResponse: () => (/* binding */ getCommentsByFetchResponse)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n/* harmony import */ var _renderPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderPage.js */ \"./scripts/renderPage.js\");\n\n\n\nconst getCommentsByFetchResponse = ({ comments, userData, token }) => {\n    try {\n        const loadingCommentsElement =\n            document.querySelector(\".loading-comments\");\n        loadingCommentsElement.classList.add(\"display-flex\");\n    } catch {\n        console.log(\"Не удалось обнаружить селекторы\");\n    }\n\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getFetchResponse)({ token })\n        .then((responseComments) => {\n            const appComments = responseComments.comments.map((comment) => {\n                return {\n                    id: comment.id,\n                    name: comment.author.name,\n                    date: new Date(comment.date),\n                    text: comment.text,\n                    likes: comment.likes,\n                    isLiked: comment.isLiked,\n                    isEditor: false,\n                };\n            });\n\n            comments = appComments;\n            (0,_renderPage_js__WEBPACK_IMPORTED_MODULE_1__.renderPage)({ comments, userData, token });\n        })\n        .then(() => {\n            try {\n                const loadingCommentsElement =\n                    document.querySelector(\".loading-comments\");\n                loadingCommentsElement.classList.remove(\"display-flex\");\n            } catch {\n                console.log(\"Не удалось обнаружить селекторы\");\n            }\n        })\n        .catch((error) => {\n            if (error.message === \"Сервер сломался\") {\n                alert(\"Сервер сломался, попробуй позже\");\n            }\n            alert(\n                \"Что-то пошло не так, скорей всего нет соединения с интернетом, попробуйте повторить позже\",\n            );\n        });\n};\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/getCommentsRenderPage.js?");

/***/ }),

/***/ "./scripts/main.js":
/*!*************************!*\
  !*** ./scripts/main.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   comments: () => (/* binding */ comments),\n/* harmony export */   userData: () => (/* binding */ userData)\n/* harmony export */ });\n/* harmony import */ var _getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getCommentsRenderPage.js */ \"./scripts/getCommentsRenderPage.js\");\n\n\nlet comments = [];\nlet userData;\n\n// старт начальной страницы\n(0,_getCommentsRenderPage_js__WEBPACK_IMPORTED_MODULE_0__.getCommentsByFetchResponse)({ comments });\n\nconsole.log(\"Modules work!\");\n\n// добавить локал сторедж\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/main.js?");

/***/ }),

/***/ "./scripts/registrationUser.js":
/*!*************************************!*\
  !*** ./scripts/registrationUser.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   newUser: () => (/* binding */ newUser)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./scripts/api.js\");\n/* harmony import */ var _renderPage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./renderPage.js */ \"./scripts/renderPage.js\");\n\n\n\nconst newUser = ({ comments }) => {\n    const registerName = document.getElementById(\"registerName\");\n    const registerLogin = document.getElementById(\"registerLogin\");\n    const registerPassword = document.getElementById(\"registerPassword\");\n\n    let userData = (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.registerUser)({\n        login: registerLogin.value,\n        name: registerName.value,\n        password: registerPassword.value,\n    })\n        .then((responseData) => {\n            return (userData = responseData.user);\n        })\n        .then(() => {\n            const token = userData.token;\n            (0,_renderPage_js__WEBPACK_IMPORTED_MODULE_1__.renderPage)({ comments, userData, token });\n        })\n        .catch((error) => {\n            if (\n                error.message === \"пользователь с таким логином уже существует\"\n            ) {\n                alert(\n                    \"Вы уже зарегистрированы, попробуйте залогиниться в системе\",\n                );\n            }\n        });\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/registrationUser.js?");

/***/ }),

/***/ "./scripts/renderComments.js":
/*!***********************************!*\
  !*** ./scripts/renderComments.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\nconst renderComments = ({ comments }) => {\n    const commentsHTML = comments\n        .map((comment, index) => {\n            const correctDate = new Date(comment.date)\n                .toLocaleString(\"ru-RU\", {\n                    year: \"2-digit\",\n                    month: \"2-digit\",\n                    day: \"2-digit\",\n                    hour: \"2-digit\",\n                    minute: \"2-digit\",\n                    hour12: false,\n                })\n                .replace(\",\", \"\");\n\n            return `<li class=\"comment\" data-index=\"${index}\">\n                    <div class=\"comment-header\">\n                        <div>${comment.name}</div>\n                        <div class=\"comment-date\">${correctDate}</div>\n                    </div>\n                    <div class=\"comment-body\">\n                        <div class=\"comment-text\" data-id=\"${comment.id}\">\n                            ${comment.text}\n                        </div> \n                    </div>\n                    <div class=\"comment-footer\">\n                        <div class=\"likes\">\n                            <span class=\"likes-counter\">${comment.likes}</span>\n                            <button data-index=\"${index}\" class=\"like-button ${\n                                comment.isLiked ? \"-active-like\" : \"\"\n                            }\"></button>\n                        </div>\n                        <div class=\"comment-delete-button\">\n                            <button class=\"delete-button\" data-index=\"${index}\">Удалить</button>\n                        </div>\n                    </div>\n                    </li>`;\n        })\n        .join(\"\");\n\n    return commentsHTML;\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/renderComments.js?");

/***/ }),

/***/ "./scripts/renderPage.js":
/*!*******************************!*\
  !*** ./scripts/renderPage.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderPage: () => (/* binding */ renderPage)\n/* harmony export */ });\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./renderComments.js */ \"./scripts/renderComments.js\");\n/* harmony import */ var _reply_omment_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./replyсomment.js */ \"./scripts/replyсomment.js\");\n/* harmony import */ var _buttonlike_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./buttonlike.js */ \"./scripts/buttonlike.js\");\n/* harmony import */ var _authorizationButton_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./authorizationButton.js */ \"./scripts/authorizationButton.js\");\n/* harmony import */ var _buttonElementListeners_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./buttonElementListeners.js */ \"./scripts/buttonElementListeners.js\");\n/* harmony import */ var _buttonDelete_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./buttonDelete.js */ \"./scripts/buttonDelete.js\");\n\n\n\n\n\n\n\nfunction renderPage({ comments, userData, token }) {\n    const appHtml = document.querySelector(\".container\");\n\n    try {\n        const inputFormElement = document.querySelector(\".add-form\");\n        const loadingFormElement = document.querySelector(\".loading\");\n\n        loadingFormElement.classList.remove(\"display-flex\");\n        inputFormElement.classList.remove(\"display-hidden\");\n    } catch {\n        console.log(\"Не удалось обнаружить селекторы\");\n    }\n\n    const commentsHTML = (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_0__.renderComments)({ comments });\n\n    const renderPageHTML = `\n        <div class=\"loading-comments\">\n            <p>Комментарии загружаются...</p>\n        </div>\n        <ul class=\"comments\">${commentsHTML}</ul>\n        <div class=\"loading\">\n            <p>Комментарий загружается...</p>\n        </div>\n        <div class=\"authorization ${token ? \"display-hidden\" : \"display-flex\"}\">\n            <p>Чтобы добавить комментарий, <a class=\"authorizationButton\" href=\"#\">авторизуйтесь</a> .</p>\n        </div>\n        <div class=\"add-form ${token ? \"display-flex\" : \"display-hidden\"}\">\n            <input id=\"input-name\" type=\"text\" class=\"add-form-name\" value='${\n                userData ? userData.name : \"\"\n            }' disabled='true'/>\n            <textarea class=\"add-form-text\" placeholder=\"Введите ваш комментарий\" rows=\"4\"></textarea>\n            <div class=\"add-form-row\">\n                <button class=\"add-form-button\">Написать</button>\n            </div>\n        </div>`;\n\n    appHtml.innerHTML = renderPageHTML;\n\n    (0,_authorizationButton_js__WEBPACK_IMPORTED_MODULE_3__.initButtonAuthorizationListener)({ comments });\n    (0,_reply_omment_js__WEBPACK_IMPORTED_MODULE_1__.initReplyCommentListener)({ comments, token, userData });\n    (0,_buttonlike_js__WEBPACK_IMPORTED_MODULE_2__.initButtonLikeListeners)({ comments, token, userData });\n    (0,_buttonElementListeners_js__WEBPACK_IMPORTED_MODULE_4__.initButtonSendCommentListener)({ token, userData });\n    (0,_buttonDelete_js__WEBPACK_IMPORTED_MODULE_5__.initButtonDeleteListener)({ comments, token, userData });\n}\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/renderPage.js?");

/***/ }),

/***/ "./scripts/replyсomment.js":
/*!*********************************!*\
  !*** ./scripts/replyсomment.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initReplyCommentListener: () => (/* binding */ initReplyCommentListener)\n/* harmony export */ });\nconst initReplyCommentListener = ({ comments, token }) => {\n    const inputTextElement = document.querySelector(\".add-form-text\");\n    const commentsList = document.querySelectorAll(\".comment\");\n\n    for (const comment of commentsList) {\n        comment.addEventListener(\"click\", () => {\n            const index = comment.dataset.index;\n\n            if (!token) return;\n\n            if (comments[index].isEditor === true) return;\n\n            inputTextElement.value = `START_QUOTE ${comments[index].name}: ${comments[index].text} END_QUOTE`;\n        });\n    }\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/reply%D1%81omment.js?");

/***/ }),

/***/ "./scripts/sanitizeHtml.js":
/*!*********************************!*\
  !*** ./scripts/sanitizeHtml.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   sanitizeHtml: () => (/* binding */ sanitizeHtml)\n/* harmony export */ });\nconst sanitizeHtml = (htmlString) => {\n    return htmlString\n        .replaceAll(\"&\", \"&amp;\")\n        .replaceAll(\"<\", \"&lt;\")\n        .replaceAll(\">\", \"&gt;\")\n        .replaceAll('\"', \"&quot;\")\n        .replaceAll(\"START_QUOTE\", '<div class=\"quote\">')\n        .replaceAll(\"END_QUOTE\", \"</div>\");\n};\n\n\n\n\n//# sourceURL=webpack://webdev-dom-homework/./scripts/sanitizeHtml.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./scripts/main.js");
/******/ 	
/******/ })()
;