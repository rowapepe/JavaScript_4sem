const express = require('express');
const router = express.Router();
const stocksController = require('../controllers/stocksController');

router.get('/', stocksController.getAllStocks);
router.get('/:id', stocksController.getStockById);
router.head('/', stocksController.headStocks);
router.head('/:id', stocksController.headStockById);
router.options('/', stocksController.optionsStocks);
router.options('/:id', stocksController.optionsStockById);
router.post('/', stocksController.createStock);
router.put('/:id', stocksController.replaceStock);
router.patch('/:id', stocksController.updateStock);
router.delete('/:id', stocksController.deleteStock);

module.exports = router;