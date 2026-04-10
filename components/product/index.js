function getHTML(data) {
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const showDetailsButton = data.showDetailsButton !== false;
    const tagsHTML = tags.length
        ? `
            <div class="d-flex flex-wrap gap-2 mb-3">
                ${tags.map((tag) => `
                            <span class="badge rounded-pill" style="background-color: #d9edf7; color: #13151A;">
                                ${tag}
                            </span>
                        `,
                    ).join("")}
            </div>
        `
        : "";

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
                        ${tagsHTML}
                        ${
                            showDetailsButton
                                ? `
                                    <div class="mt-auto d-flex justify-content-between gap-2">
                                        <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Подробнее</button>
                                    </div>
                                `
                                : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    `;
}

function addListeners(data, onDetails) {
    const detailsButton = document.getElementById(`click-card-${data.id}`);
    if (detailsButton && onDetails) {
        detailsButton.addEventListener("click", (e) => {
            e.preventDefault();
            onDetails(e);
        });
    }
}

export function renderProduct(parent, data, onDetails) {
    const html = getHTML(data);
    parent.insertAdjacentHTML("beforeend", html);
    addListeners(data, onDetails);
}
