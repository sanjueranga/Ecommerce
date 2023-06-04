const express = require('express')
const router = express.Router();

const {getProducts , newProduct, getSingleProduct,updateProduct,deleteProduct,getAdminProducts} = require('../controllers/productController');
const { route } = require('../app');


router.route('/products').get(getProducts);
router.route('/admin/products').get(getAdminProducts);
router.route('/product/:id').get(getSingleProduct);



router.route('/admin/products/:id').delete(deleteProduct);

module.exports = router;



