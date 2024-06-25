const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.post('/add-to-cart', shopController.addToCart); 

router.get('/view-product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postOrder); 

router.get("/deleteCart-item/:productId", shopController.deleteCartItem);

module.exports = router;
