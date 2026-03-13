import { BackButtonComponent } from "../../components/back-button/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { getCardById } from "../../data/cards.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        return getCardById(this.id);
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    get headerRoot() {
        return document.getElementById('header');
    }

    getHTML() {
        return `
            <div id="header"></div>
            <div class="container">
                <div id="product-page"></div>
            </div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
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
        header.render(this.clickHome.bind(this));

        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        const productData = data?.product ?? data?.card ?? data;
        if (productData) product.render(productData);
    }
}
