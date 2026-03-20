# ЛР 3. Простое веб-приложение. Верстка

**Студент:** Верзаков Н.В.
**Группа:** ИУ5-44Б

**Тема:** Уведомления электронных услуг

Стиль вдохновлен сайтом mos.ru

**Цель** данной лабораторной работы - знакомство с node, npm, написание простого приложения на JavaScript. В ходе выполнения работы, вам предстоит ознакомиться с кодом реализации простого интерфейса и вывода данных, и затем выполнить задания по варианту.

## Содержание

* [Задание](#задание)
* [Дополнительное задание](#дополнительное-задание)

## Задание

1. Установить Node.js и подготовить рабочую среду разработки (VS Code и Live Server).
2. Инициализировать проект npm:
* создать новую папку проекта;
* выполнить команду npm init;
* получить файл package.json.
3.	Подготовить структуру проекта:
* создать файл .gitignore;
* организовать структуру каталогов и файлов проекта.
4. Создать главную страницу приложения:
* создать файл index.html;
* подключить библиотеку Bootstrap;
* реализовать базовую HTML-разметку страницы.
5. Реализовать взаимодействие HTML и JavaScript:
* получать элементы страницы через getElementById;
* добавлять HTML-элементы через insertAdjacentHTML.
6. Добавить простую кнопку на JavaScript, которая выполняет действие при нажатии.
7. Организовать структуру проекта:
* разделить код по файлам;
* выделить папки для страниц, скриптов и ресурсов.
8. Сверстать главную страницу веб-приложения:
* создать базовый интерфейс;
* использовать компоненты Bootstrap.
9. Создать и сверстать страницу продукта:
* реализовать отдельную страницу с информацией о товаре (или элементе);
* оформить её с использованием HTML и Bootstrap.
10. Сделать кнопки "Добавить" и "Удалить" карточку

## Дополнительное задание
**Условие:** 
* При переходе на страницу карточки добавить кнопку подробнее, которая ведет на более глубокую страницу, на которой реализовать 2 кнопки "Возврат на предыдущую страницу" и "Возврат на главное меню"

**Решение:**
Добавил страницу для подробностей карточки product-extended
```javascript
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

```
В product страницу добавил:
```javascript
import { ProductExtendedPage } from "../product-extended/index.js";
...
export class ProductPage {
    ...
    clickDetails() {
        const extendedPage = new ProductExtendedPage(this.parent, this.id);
        extendedPage.render();
    }
    ...
}
```
Также добавил в карточку product
```javascript
<div class="mt-auto d-flex justify-content-between gap-2">
    <button class="btn btn-primary" id="click-card-${data.id}" data-id="${data.id}" data-product-id="${data.productId ?? data.id}" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;">Подробнее</button>
</div>
```
```javascript
    addListeners(data, onDetails) {
        const detailsButton = document.getElementById(`click-card-${data.id}`);
        if (detailsButton && onDetails) {
            detailsButton.addEventListener("click", (e) => {
                e.preventDefault();
                onDetails(e);
            });
        }
    }

    render(data, onDetails) {
        ...
        this.addListeners(data, onDetails);
    }
```
И реализовал сам компонент с 2 кнопками
```javascript
export class ProductExtendedComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <div class="card" style="width: 500px; margin-top: 1rem;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">Дополнительно</h5>
                    <p class="card-text">Что вы хотите сделать дальше?</p>
                    <div class="mt-auto d-flex justify-content-between gap-2">
                        <button id="product-extended-back" class="btn btn-primary" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;" type="button">Назад</button>
                        <button id="product-extended-home" class="btn btn-primary" style="background-color: #c4c8d0; color: #13151A; border-color: #c4c8d0;" type="button">В главное меню</button>
                    </div>
                </div>
            </div>
        `;
    }

    addListeners(onBack, onHome) {
        const backButton = document.getElementById("product-extended-back");
        if (backButton && onBack) {
            backButton.addEventListener("click", (e) => {
                e.preventDefault();
                onBack(e);
            });
        }

        const homeButton = document.getElementById("product-extended-home");
        if (homeButton && onHome) {
            homeButton.addEventListener("click", (e) => {
                e.preventDefault();
                onHome(e);
            });
        }
    }

    render(onBack, onHome) {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
        this.addListeners(onBack, onHome);
    }
}

```