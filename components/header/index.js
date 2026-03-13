export class HeaderComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(onHome, onAdd) {
        if (onHome) {
            document
                .getElementById("home-link")
                .addEventListener("click", (e) => {
                    e.preventDefault();
                    onHome(e);
                });
        }

        document
            .getElementById("add-card")
            ?.addEventListener("click", (e) => {
                e.preventDefault();
                if (onAdd) onAdd(e);
            });
    }

    getHTML() {
        return `
            <header class="site-header m-3">
                <div class="container">
                    <div class="header-container mt-auto d-flex align-items-center gap-2">
                        <a href="#" class="logo-link d-inline-block ms-2" id="home-link">
                            <span class="logo-link">
                                <img src="https://www.mos.ru/front/markup/header-footer/img/logo.svg" alt="Логотип">
                            </span>
                        </a>
                        <button id="add-card" class="btn btn-add ms-3" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Добавить карточку</button>
                    </div>
                </div>
            </header>
        `;
    }

    render(onHome, onAdd) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(onHome, onAdd);
    }
}
