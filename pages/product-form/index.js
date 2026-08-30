import { BackButtonComponent } from "../../components/back-button/index.js";
import { HeaderComponent } from "../../components/header/index.js";
import { ProductFormComponent } from "../../components/product-form/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { MainPage } from "../main/index.js";
import { ProductPage } from "../product/index.js";

export class ProductFormPage {
    constructor(parent, id = null) {
        this.parent = parent;
        this.id = id;
        this.errorMessage = "";
    }

    get pageRoot() {
        return document.getElementById("product-form-page");
    }

    get controlsRoot() {
        return document.getElementById("product-form-controls");
    }

    get formRoot() {
        return document.getElementById("product-form-root");
    }

    get headerRoot() {
        return document.getElementById("header");
    }

    get isEditMode() {
        return Boolean(this.id);
    }

    getHTML() {
        return `
            <div id="header" style="margin-top: 21px;"></div>
            <div class="container">
                <div id="product-form-page">
                    <div id="product-form-controls"></div>
                    <div id="product-form-root"></div>
                </div>
            </div>
        `;
    }

    clickHome() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    submitForm(values) {
        const callback = (data, status) => {
            const successStatuses = this.isEditMode ? [200] : [201];
            if (!successStatuses.includes(status) || !data) {
                this.errorMessage = data?.error ?? "Не удалось сохранить карточку.";
                this.renderForm(values);
                return;
            }

            const productPage = new ProductPage(this.parent, data.id);
            productPage.render();
        };

        if (this.isEditMode) {
            ajax.patch(stockUrls.updateStockById(this.id), values, callback);
            return;
        }

        ajax.post(stockUrls.createStock(), values, callback);
    }

    renderForm(values = {}) {
        const form = new ProductFormComponent(this.formRoot);
        form.render(
            {
                mode: this.isEditMode ? "edit" : "create",
                values,
                message: this.errorMessage,
            },
            this.submitForm.bind(this),
            this.clickHome.bind(this),
        );
    }

    getData() {
        if (!this.isEditMode) {
            this.renderForm();
            return;
        }

        ajax.get(stockUrls.getStockById(this.id), (data, status) => {
            if (status !== 200 || !data) {
                this.errorMessage = "Не удалось загрузить данные карточки.";
                this.renderForm();
                return;
            }

            this.renderForm(data);
        });
    }

    render() {
        this.parent.innerHTML = "";
        this.parent.insertAdjacentHTML("beforeend", this.getHTML());

        const header = new HeaderComponent(this.headerRoot);
        header.render(this.clickHome.bind(this));

        this.getData();
    }
}
