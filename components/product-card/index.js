function getHTML(data) {
    return `
        <div class="card" style="width: 300px; height: 360px;" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" data-title="${data.title}">
            <img class="d-block mx-auto mt-3" src="${data.src}" alt="картинка" style="height: 160px; width: 160px; object-fit: cover; object-position: center;">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.text}</p>
                <div class="mt-auto d-flex justify-content-between gap-2">
                    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Перейти</button>
                    <button class="btn btn-delete" id="delete-card-${data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Удалить</button>
                </div>
            </div>
        </div>
    `;
}

function addListeners(data, listener) {
    const openButton = document.getElementById(`click-card-${data.id}`);
    if (openButton && listener) {
        openButton.addEventListener("click", listener);
    }

    const deleteButton = document.getElementById(`delete-card-${data.id}`);
    if (deleteButton) {
        deleteButton.addEventListener("click", (event) => {
            event.preventDefault();
            const card = event.currentTarget.closest(".card");
            if (card) card.remove();
        });
    }
}

export function renderProductCard(parent, data, listener) {
    const html = getHTML(data);
    parent.insertAdjacentHTML("beforeend", html);
    addListeners(data, listener);
}
