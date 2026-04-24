export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 280px; height: 400px;" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" data-title="${data.title}">
                <img class="d-block mx-auto mt-3" src="${data.src}" alt="картинка" style="height: 160px; width: 160px; object-fit: cover; object-position: center;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <div class="mt-auto d-flex flex-wrap gap-2">
                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Перейти</button>
                        <button class="btn btn-secondary" id="edit-card-${data.id}" data-id="${data.id}" style="background-color: #dbe5f2; color: #13151A; border-color: #dbe5f2;">Редактировать</button>
                        <button class="btn btn-delete" id="delete-card-${data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Удалить</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, options = {}) {
        const handlers =
            typeof options === "function" ? { onOpen: options } : options;

        const openButton = document.getElementById(`click-card-${data.id}`);
        if (openButton && handlers.onOpen) {
            openButton.addEventListener("click", handlers.onOpen);
        }

        const editButton = document.getElementById(`edit-card-${data.id}`);
        if (editButton && handlers.onEdit) {
            editButton.addEventListener("click", handlers.onEdit);
        }

        const deleteButton = document.getElementById(`delete-card-${data.id}`);
        if (deleteButton) {
            deleteButton.addEventListener("click", (event) => {
                event.preventDefault();

                if (handlers.onDelete) {
                    handlers.onDelete(event);
                    return;
                }

                const card = event.currentTarget.closest(".card");
                if (card) {
                    card.remove();
                }
            });
        }
    }

    render(data, options) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, options);
    }
}
