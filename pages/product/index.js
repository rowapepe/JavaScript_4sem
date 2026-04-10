import { renderHeader } from "../../components/header/index.js";
import { renderProduct } from "../../components/product/index.js";
import { getCardById } from "../../data/cards.js";
import { newsData } from "../../data/news.js";
import { MainPage } from "../main/index.js";
import { ProductExtendedPage } from "../product-extended/index.js";
import { getMaxOnesSequenceLength } from "../../utils/max-ones.js";
import { sortText } from "../../utils/sort.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = Number(id);
        this.shouldSortNewsTags = false;
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

    get statsRoot() {
        return document.getElementById("services-stats");
    }

    get newsRoot() {
        return document.getElementById("news-list");
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

    getServicesStatsHTML() {
        return `
            <div class="card" style="width: 500px; margin-top: 1rem;">
                <div class="card-body">
                    <h5 class="card-title">Статистика выполненных услуг</h5>
                    <p class="card-text">
                        Введите последовательность из 0 и 1, где
                        1 означает выполненную услугу, а 0 - пропуск.
                    </p>
                    <div class="mb-3">
                        <label for="services-binary-input" class="form-label">Последовательность услуг</label>
                        <input id="services-binary-input" class="form-control" type="text" placeholder="Например: 1101110111">
                    </div>
                    <button id="services-stats-button" class="btn btn-primary" type="button" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">
                        Показать статистику
                    </button>
                    <div id="services-stats-result" class="mt-3"></div>
                </div>
            </div>
        `;
    }

    getNews3DHTML() {
        return `
            <div class="card" style="width: 500px; margin-top: 1rem;">
                <div class="card-body">
                    <h5 class="card-title">3D модель газеты</h5>
                    <p class="card-text">
                        Модель отображается через готовый просмотрщик из папки <code>3D</code>.
                    </p>
                    <iframe src="3D/detail.html?news=1&embedded=1" title="3D модель газеты" style="width: 100%; height: 520px; border: 0; border-radius: 12px; background: #e6ebf5;"></iframe>
                </div>
            </div>
        `;
    }

    renderNewsList() {
        if (!this.newsRoot) return;

        this.newsRoot.innerHTML = "";

        newsData.forEach((item) => {
            const news = item.product ?? item;
            const tags = Array.isArray(news.tags) ? news.tags : [];
            const sortedTags = this.shouldSortNewsTags ? sortText(tags.join(" ")).split(" ").filter((tag) => tag) : tags;

            renderProduct(
                this.newsRoot,
                {
                    id: `news-${item.id}`,
                    productId: item.id,
                    showDetailsButton: false,
                    ...news,
                    tags: sortedTags,
                },
                null,
            );
        });
    }

    clickSortTags() {
        this.shouldSortNewsTags = true;
        this.renderNewsList();
    }

    renderServicesStats() {
        if (!this.statsRoot) return;

        this.statsRoot.insertAdjacentHTML("beforeend", this.getServicesStatsHTML());

        document
            .getElementById("services-stats-button")
            ?.addEventListener("click", () => {
                const input = document.getElementById("services-binary-input");
                const result = document.getElementById("services-stats-result");

                if (!input || !result) return;

                const value = input.value.trim();
                const maxLength = getMaxOnesSequenceLength(value);

                if (value.length === 0) {
                    result.innerHTML = `
                        <div class="alert alert-warning mb-0" role="alert">
                            Введите последовательность из 0 и 1.
                        </div>
                    `;
                    return;
                }

                if (maxLength === null) {
                    result.innerHTML = `
                        <div class="alert alert-danger mb-0" role="alert">
                            Допустимы только символы 0 и 1.
                        </div>
                    `;
                    return;
                }

                result.innerHTML = `
                    <div class="alert alert-success mb-0" role="alert">
                        Максимальная серия выполненных услуг: <strong>${maxLength}</strong>
                    </div>
                `;
            });
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        renderHeader(
            this.headerRoot,
            this.clickHome.bind(this),
            null,
            this.id === 1 ? this.clickSortTags.bind(this) : null,
        );

        const data = this.getData();
        const rawProductData = data?.product ?? data?.card ?? data;
        const productData = rawProductData ? { id: this.id, productId: this.id, ...rawProductData } : null;

        if (this.id !== 1 && rawProductData) {
            renderProduct(this.pageRoot, productData, this.clickDetails.bind(this));
        }

        if (this.id === 1) {
            this.pageRoot.insertAdjacentHTML("beforeend", `<div id="news-list" class="d-flex flex-wrap gap-3"></div>`);
            this.renderNewsList();
            this.pageRoot.insertAdjacentHTML("beforeend", this.getNews3DHTML());
        }

        if (this.id === 2) {
            this.pageRoot.insertAdjacentHTML("beforeend", `<div id="services-stats"></div>`);
            this.renderServicesStats();
        }
    }
}
