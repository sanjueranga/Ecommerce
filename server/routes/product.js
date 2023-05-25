const express = require('express')
const router = express.Router();

const {getProducts , newProduct} = require('../controllers/productController');
const { route } = require('../app');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);

module.exports = router;

