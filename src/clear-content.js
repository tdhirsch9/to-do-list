
export const clearContent = () => {
    const content = document.querySelector('.main-content');
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    }
};
