const express = require('express');
const ProductController = require('../controllers/product.controller')
const router = express.Router();

router.get('/products', ProductController.getAll);

router.get('/products/random', ProductController.getRandom);

router.get('/products/:id', ProductController.getOne);

router.post('/products', ProductController.addOne);

router.put('/products/:id', ProductController.changeOne);

router.delete('/products/:id', ProductController.deleteOne);

module.exports = router;
