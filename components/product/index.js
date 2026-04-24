export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 500px; margin-top: 1rem">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${data.src}" class="img-fluid" alt="картинка" style="height: 100%; width: 100%; object-fit: cover; object-position: center;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                            <div class="mt-auto d-flex flex-wrap gap-2">
                                <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Подробнее</button>
                                <button class="btn btn-secondary" id="edit-card-${data.id}" data-id="${data.id}" style="background-color: #dbe5f2; color: #13151A; border-color: #dbe5f2;">Редактировать</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(data, options = {}) {
        const handlers =
            typeof options === "function"
                ? { onDetails: options }
                : options;

        const detailsButton = document.getElementById(`click-card-${data.id}`);
        if (detailsButton && handlers.onDetails) {
            detailsButton.addEventListener("click", (e) => {
                e.preventDefault();
                handlers.onDetails(e);
            });
        }

        const editButton = document.getElementById(`edit-card-${data.id}`);
        if (editButton && handlers.onEdit) {
            editButton.addEventListener("click", (e) => {
                e.preventDefault();
                handlers.onEdit(e);
            });
        }
    }

    render(data, options) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, options);
    }
}
