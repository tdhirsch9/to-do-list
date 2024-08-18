

let isProjectSubmitListenerAdded = false;

const addProjectSubmitListener = (submitButton, handler) => {
    if (submitButton && !isProjectSubmitListenerAdded) {
        submitButton.addEventListener("click", handler);
        isProjectSubmitListenerAdded = true;

    }
};

const removeProjectSubmitListener = (submitButton, handler) => {
    if (submitButton && isProjectSubmitListenerAdded) {
        submitButton.removeEventListener("click", handler);
        isProjectSubmitListenerAdded = false;
    }
};



export { addProjectSubmitListener, removeProjectSubmitListener };