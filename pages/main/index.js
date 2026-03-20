import { HeaderComponent } from "../../components/header/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { cardsData } from "../../data/cards.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    getData() {
        return cardsData;
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

    clickAddCard() {
        const data = this.getData();
        const firstItem = data?.[0];
        if (!firstItem) return;

        const existingIds = Array.from(this.pageRoot.querySelectorAll(".card[data-id]"))
            .map((el) => Number(el.dataset.id))
            .filter((value) => Number.isFinite(value));
        const nextDomId = (existingIds.length ? Math.max(...existingIds) : 0) + 1;

        const productCard = new ProductCardComponent(this.pageRoot);
        const cardData = firstItem.card ?? firstItem;
        productCard.render(
            { id: nextDomId, productId: firstItem.id, ...cardData },
            this.clickCard.bind(this),
        );
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

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            const cardData = item.card ?? item;
            productCard.render({ id: item.id, ...cardData }, this.clickCard.bind(this));
        });
    }
}
