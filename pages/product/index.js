import { HeaderComponent } from "../../components/header/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { getCardById } from "../../data/cards.js";
import { MainPage } from "../main/index.js";
import { ProductExtendedPage } from "../product-extended/index.js";

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
            <div id="header" style="margin-top: 21px;"></div>
            <div class="container">
                <div id="product-page"></div>
            </div>
        `;
    }

    clickDetails() {
        const extendedPage = new ProductExtendedPage(this.parent, this.id);
        extendedPage.render();
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

        const data = this.getData();
        const product = new ProductComponent(this.pageRoot);
        const rawProductData = data?.product ?? data?.card ?? data;
        if (rawProductData) {
            const productData = { id: this.id, productId: this.id, ...rawProductData };
            product.render(productData, this.clickDetails.bind(this));
        }
    }
}
