# ЛР 4. Backend на Express.js

**Студент:** Верзаков Н.В.
**Группа:** ИУ5-44Б

**Тема:** Уведомления электронных услуг

Стиль вдохновлен сайтом mos.ru

**Цель** данной лабораторной работы - освоить создание бэкенда на Express.js и разработать REST API для карточек Stock с базовой архитектурой приложения, CRUD-операциями и проверкой работы через Postman.

## Содержание

* [Задание](#задание)
* [Дополнительное задание](#дополнительное-задание)

## Задание

Разработать REST API сервис карточек c методами:
- GET /stocks/ — получение всех карточек
- POST /stocks — создание новой карточки
- GET /stocks/:id — получение карточки по ID
- PATCH /stocks/:id — обновление карточки по ID
- DELETE /stocks/:id — удаление карточки по ID


## Дополнительное задание
**Условие:** 
- Реализовать методы PUT, HEAD, OPTIONS

**Решение:**
- Реализовал в stockservice.js
```javascript
const replaceStock = (req, res) => {
    const id = parseInt(req.params.id);
    const { src, title, text } = req.body;

    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Для PUT нужны поля src, title и text' });
    }

    const replacedStock = stocksService.replace(id, { src, title, text });

    if (!replacedStock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }

    res.json(replacedStock);
};

const headStocks = (req, res) => {
    res.status(200).end();
};

const headStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);

    if (!stock) {
        return res.status(404).end();
    }

    res.status(200).end();
};

const optionsStocks = (req, res) => {
    res.set('Allow', 'GET, POST, HEAD, OPTIONS');
    res.status(204).end();
};

const optionsStockById = (req, res) => {
    res.set('Allow', 'GET, PUT, PATCH, DELETE, HEAD, OPTIONS');
    res.status(204).end();
};
```

- Добавил в routes
```javascript
router.head('/', stocksController.headStocks);
router.head('/:id', stocksController.headStockById);
router.options('/', stocksController.optionsStocks);
router.options('/:id', stocksController.optionsStockById);
router.put('/:id', stocksController.replaceStock);
```
 
- Добавил в stocksServie.js
```javascript
const replace = (id, stockData) => {
    const stocks = fileService.readData(dataFilePath);
    const index = stocks.findIndex(s => s.id === id);

    if (index === -1) return null;

    stocks[index] = { id, ...stockData };
    fileService.writeData(dataFilePath, stocks);

    return stocks[index];
};
```