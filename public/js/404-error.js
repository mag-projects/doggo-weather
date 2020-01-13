const getParams = () => {
    let pageURL = window.location.href;
    let lastURLSegment = pageURL.substr(pageURL.lastIndexOf('/') + 1);
    return lastURLSegment
};
const errorMessage = document.querySelector("p");
errorMessage.textContent = `localhost:3000/${getParams()} could not be found!`;
