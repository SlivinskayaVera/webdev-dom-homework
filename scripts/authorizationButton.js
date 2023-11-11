import { drawEnterPage } from "./drawEnterPage.js";

export const initButtonAuthorizationListener = ({ comments }) => {
    const appHtml = document.querySelector(".container");
    const buttonForAuthorization = document.querySelector(
        ".authorizationButton",
    );

    buttonForAuthorization.addEventListener("click", () => {
        drawEnterPage({ comments, appHtml });
    });
};
