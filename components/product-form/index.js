export class ProductFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML({ mode = "create", values = {}, message = "" } = {}) {
        const card = values.card ?? {};
        const product = values.product ?? {};
        const title = mode === "edit" ? "Редактирование карточки" : "Добавление карточки";
        const buttonLabel = mode === "edit" ? "Сохранить изменения" : "Создать карточку";

        return `
            <div class="card mt-3" style="max-width: 760px;">
                <div class="card-body">
                    <h2 class="card-title h4 mb-3">${title}</h2>
                    ${message ? `<div class="alert alert-danger" role="alert">${message}</div>` : ""}
                    <form id="product-form" class="d-flex flex-column gap-3">
                        <div>
                            <h3 class="h6 mb-3">Карточка на главной</h3>
                            <div class="d-flex flex-column gap-2">
                                <input class="form-control" name="card-src" placeholder="Ссылка на изображение карточки" value="${card.src ?? ""}" required>
                                <input class="form-control" name="card-title" placeholder="Заголовок карточки" value="${card.title ?? ""}" required>
                                <textarea class="form-control" name="card-text" rows="3" placeholder="Описание карточки" required>${card.text ?? ""}</textarea>
                            </div>
                        </div>
                        <div>
                            <h3 class="h6 mb-3">Детальная страница</h3>
                            <div class="d-flex flex-column gap-2">
                                <input class="form-control" name="product-src" placeholder="Ссылка на изображение детальной страницы" value="${product.src ?? ""}" required>
                                <input class="form-control" name="product-title" placeholder="Заголовок детальной страницы" value="${product.title ?? ""}" required>
                                <textarea class="form-control" name="product-text" rows="4" placeholder="Описание детальной страницы" required>${product.text ?? ""}</textarea>
                            </div>
                        </div>
                        <div class="d-flex gap-2">
                            <button class="btn btn-primary" type="submit" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">${buttonLabel}</button>
                            <button class="btn btn-secondary" type="button" id="cancel-product-form">Отмена</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    addListeners(onSubmit, onCancel) {
        const form = document.getElementById("product-form");
        form?.addEventListener("submit", (event) => {
            event.preventDefault();

            const formData = new FormData(event.currentTarget);
            onSubmit({
                card: {
                    src: formData.get("card-src")?.toString().trim(),
                    title: formData.get("card-title")?.toString().trim(),
                    text: formData.get("card-text")?.toString().trim(),
                },
                product: {
                    src: formData.get("product-src")?.toString().trim(),
                    title: formData.get("product-title")?.toString().trim(),
                    text: formData.get("product-text")?.toString().trim(),
                },
            });
        });

        document.getElementById("cancel-product-form")?.addEventListener("click", (event) => { event.preventDefault(); onCancel?.(event); });
    }

    render(config, onSubmit, onCancel) {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML(config));
        this.addListeners(onSubmit, onCancel);
    }
}
