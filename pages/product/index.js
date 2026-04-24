import { HeaderComponent } from "../../components/header/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import { ProductFormPage } from "../product-form/index.js";
import { ProductExtendedPage } from "../product-extended/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
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

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    clickEdit() {
        const productFormPage = new ProductFormPage(this.parent, this.id);
        productFormPage.render();
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status !== 200 || !data) {
                this.pageRoot.insertAdjacentHTML("beforeend", "<p>Карточка не найдена.</p>");
                return;
            }

            this.renderData(data);
        });
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        const rawProductData = item.product ?? item;
        const productData = { id: this.id, productId: this.id, ...rawProductData };

        product.render(productData, {
            onDetails: this.clickDetails.bind(this),
            onEdit: this.clickEdit.bind(this),
        });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.clickHome.bind(this));

        this.getData();
    }
}
