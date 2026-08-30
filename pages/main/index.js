import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ProductFormPage } from "../product-form/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    get headerRoot() {
        return document.getElementById('header');
    }

    get controlsRoot() {
        return document.getElementById('main-controls');
    }

    getHTML() {
        return `
            <div id="header"></div>
            <div class="container">
                <div id="main-controls" class="d-flex flex-wrap align-items-center gap-2 mb-3">
                    <button id="append-sobyanin" class="btn btn-primary" type="button" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Добавить Собянин к Москве</button>
                    <button id="show-sobyanin" class="btn btn-secondary" type="button">Показать карточки с Собяниным</button>
                    <span id="main-status" class="text-muted"></span>
                </div>
                <div id="main-page" class="d-flex flex-wrap gap-3"></div>
            </div>
        `;
    }

    clickCard(e) {
        const cardId = e.currentTarget.dataset.productId ?? e.currentTarget.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
    }

    clickEditCard(e) {
        const cardId = e.currentTarget.dataset.id;
        const productFormPage = new ProductFormPage(this.parent, cardId);
        productFormPage.render();
    }

    clickDeleteCard(e) {
        const cardId = e.currentTarget.closest(".card")?.dataset.id;
        if (!cardId) {
            return;
        }

        ajax.delete(stockUrls.removeStockById(cardId), (data, status) => {
            if (status !== 204) {
                alert(data?.error ?? "Не удалось удалить карточку.");
                return;
            }

            this.getData();
        });
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data, status) => {
            if (status !== 200 || !Array.isArray(data)) {
                this.pageRoot.innerHTML = "<p>Не удалось загрузить карточки.</p>";
                return;
            }

            this.renderData(data);
        });
    }

    renderData(items) {
        this.pageRoot.innerHTML = '';

        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            const cardData = item.card ?? item;
            productCard.render(
                { id: item.id, ...cardData },
                {
                    onOpen: this.clickCard.bind(this),
                    onEdit: this.clickEditCard.bind(this),
                    onDelete: this.clickDeleteCard.bind(this),
                },
            );
        });
    }

    setStatus(message) {
        const statusRoot = document.getElementById("main-status");
        if (statusRoot) {
            statusRoot.textContent = message;
        }
    }

    appendSobyaninToMoscow() {
        this.setStatus("Запрос выполнится через 5 секунд...");

        setTimeout(() => {
            ajax.get(stockUrls.getStocks("Москва"), (items, status) => {
                if (status !== 200 || !Array.isArray(items)) {
                    this.setStatus("Не удалось найти карточки со словом Москва.");
                    return;
                }

                if (items.length === 0) {
                    this.setStatus("Карточек со словом Москва нет.");
                    return;
                }

                let completedRequests = 0;
                let failedRequests = 0;

                items.forEach((item) => {
                    const currentTitle = item.card?.title ?? item.title ?? "";
                    const nextTitle = currentTitle.includes("Собянин")
                        ? currentTitle
                        : `${currentTitle} Собянин`.trim();

                    const nextItem = item.card
                        ? { ...item, card: { ...item.card, title: nextTitle } }
                        : { ...item, title: nextTitle };

                    ajax.patch(stockUrls.updateStockById(item.id), nextItem, (data, patchStatus) => {
                        completedRequests += 1;

                        if (patchStatus !== 200 || !data) {
                            failedRequests += 1;
                        }

                        if (completedRequests === items.length) {
                            if (failedRequests > 0) {
                                this.setStatus(`Не удалось обновить карточек: ${failedRequests}.`);
                                return;
                            }

                            this.setStatus(`Обновлено карточек: ${items.length}.`);
                            this.getData();
                        }
                    });
                });
            });
        }, 5000);
    }

    showSobyaninCards() {
        ajax.get(stockUrls.getStocks("Собянин"), (items, status) => {
            if (status !== 200 || !Array.isArray(items)) {
                this.setStatus("Не удалось загрузить карточки со словом Собянин.");
                return;
            }

            this.setStatus(`Найдено карточек: ${items.length}.`);
            this.renderData(items);
        });
    }

    addControlListeners() {
        document
            .getElementById("append-sobyanin")
            ?.addEventListener("click", this.appendSobyaninToMoscow.bind(this));

        document
            .getElementById("show-sobyanin")
            ?.addEventListener("click", this.showSobyaninCards.bind(this));
    }

    clickAddCard() {
        const productFormPage = new ProductFormPage(this.parent);
        productFormPage.render();
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.clickHome.bind(this), this.clickAddCard.bind(this));

        this.addControlListeners();
        this.getData();
    }
}
