function addListeners(onHome, onAdd, onSortTags) {
    if (onHome) {
        document.getElementById("home-link").addEventListener("click", (e) => { e.preventDefault(); onHome(e); });
    }

    if (onAdd) {
        document.getElementById("add-card")?.addEventListener("click", (e) => { e.preventDefault(); onAdd(e); });
    }

    if (onSortTags) {
        document.getElementById("sort-tags")?.addEventListener("click", (e) => { e.preventDefault(); onSortTags(e); });
    }
}

function getHTML({ showAddButton = true, showSortTagsButton = false } = {}) {
    return `
        <header class="site-header m-3">
            <div class="container">
                <div class="header-container mt-auto d-flex align-items-center gap-2">
                    <a href="#" class="logo-link d-inline-block ms-2" id="home-link">
                        <span class="logo-link">
                            <img src="https://www.mos.ru/front/markup/header-footer/img/logo.svg" alt="Логотип">
                        </span>
                    </a>
                    ${showAddButton ? `<button id="add-card" class="btn btn-add ms-3" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Добавить карточку</button>` : ""}
                    ${showSortTagsButton ? `<button id="sort-tags" class="btn ms-1" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Сортировать теги</button>` : ""}
                </div>
            </div>
        </header>
    `;
}

export function renderHeader(parent, onHome, onAdd, onSortTags) {
    const html = getHTML({
        showAddButton: Boolean(onAdd),
        showSortTagsButton: Boolean(onSortTags),
    });

    parent.insertAdjacentHTML("beforeend", html);
    addListeners(onHome, onAdd, onSortTags);
}
