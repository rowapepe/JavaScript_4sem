const stocksService = require('../services/stocksService');

const getAllStocks = (req, res) => {
    const { title } = req.query;
    const stocks = stocksService.findAll(title);
    res.json(stocks);
};

const getStockById = (req, res) => {
    const id = parseInt(req.params.id);
    const stock = stocksService.findOne(id);
    
    if (!stock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(stock);
};

const createStock = (req, res) => {
    const { src, title, text } = req.body;
    
    // Простая валидация
    if (!src || !title || !text) {
        return res.status(400).json({ error: 'Не все поля заполнены' });
    }
    
    const newStock = stocksService.create({ src, title, text });
    res.status(201).json(newStock);
};

const updateStock = (req, res) => {
    const id = parseInt(req.params.id);
    const updatedStock = stocksService.update(id, req.body);
    
    if (!updatedStock) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.json(updatedStock);
};

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

const deleteStock = (req, res) => {
    const id = parseInt(req.params.id);
    const success = stocksService.remove(id);
    
    if (!success) {
        return res.status(404).json({ error: 'Карточка не найдена' });
    }
    
    res.status(204).send(); // 204 No Content
};

module.exports = {
    getAllStocks,
    getStockById,
    createStock,
    updateStock,
    replaceStock,
    deleteStock,
    headStocks,
    headStockById,
    optionsStocks,
    optionsStockById
};
