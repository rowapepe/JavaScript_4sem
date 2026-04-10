function addListeners(listener) {
    document.getElementById("back-button").addEventListener("click", listener);
}

function getHTML() {
    return `
        <button id="back-button" class="btn btn-primary" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;" type="button">Назад</button>
    `;
}

export function renderBackButton(parent, listener) {
    const html = getHTML();
    parent.insertAdjacentHTML("beforeend", html);
    addListeners(listener);
}
