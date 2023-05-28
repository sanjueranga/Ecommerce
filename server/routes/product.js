const express = require('express')
const router = express.Router();

const {getProducts , newProduct, getSingleProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const { route } = require('../app');

router.route('/products').get(getProducts);
router.route('/product/new').post(newProduct);
router.route('/products/:id').get(getSingleProduct);


router.route('/admin/products/:id').delete(deleteProduct);

module.exports = router;



