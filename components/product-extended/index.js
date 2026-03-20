export class ProductExtendedComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="card" style="width: 500px; margin-top: 1rem;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">Дополнительно</h5>
                    <p class="card-text">Что вы хотите сделать дальше?</p>
                    <div class="mt-auto d-flex justify-content-between gap-2">
                        <button id="product-extended-back" class="btn btn-primary" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;" type="button">Назад</button>
                        <button id="product-extended-home" class="btn btn-primary" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;" type="button">В главное меню</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(onBack, onHome) {
        const backButton = document.getElementById("product-extended-back");
        if (backButton && onBack) {
            backButton.addEventListener("click", (e) => {
                e.preventDefault();
                onBack(e);
            });
        }

        const homeButton = document.getElementById("product-extended-home");
        if (homeButton && onHome) {
            homeButton.addEventListener("click", (e) => {
                e.preventDefault();
                onHome(e);
            });
        }
    }

    render(onBack, onHome) {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onBack, onHome);
    }
}
