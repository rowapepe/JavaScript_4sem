import { HeaderComponent } from "../../components/header/index.js";
import { ProductExtendedComponent } from "../../components/product-extended/index.js";
import { MainPage } from "../main/index.js";
import { ProductPage } from "../product/index.js";

export class ProductExtendedPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    get pageRoot() {
        return document.getElementById("product-extended-page");
    }

    get headerRoot() {
        return document.getElementById("header");
    }

    getHTML() {
        return `
            <div id="header" style="margin-top: 21px;"></div>
            <div class="container">
                <div id="product-extended-page"></div>
            </div>
        `;
    }

    clickBack() {
        const productPage = new ProductPage(this.parent, this.id);
        productPage.render();
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.clickHome.bind(this));

        const extended = new ProductExtendedComponent(this.pageRoot);
        extended.render(this.clickBack.bind(this), this.clickHome.bind(this));
    }
}
