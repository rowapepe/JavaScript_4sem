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

    getHTML() {
        return `
            <div id="header"></div>
            <div class="container">
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

    clickAddCard() {
        const productFormPage = new ProductFormPage(this.parent);
        productFormPage.render();
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }w

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.clickHome.bind(this), this.clickAddCard.bind(this));

        this.getData();
    }
}
