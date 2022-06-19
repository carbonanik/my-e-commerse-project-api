const express = require('express');
const router = express.Router();
const {
    getPopular,
    getRecommended,
    getAllProducts,
    addProduct,
} = require('../controller/product');

router.get('/popular', getPopular);
router.get('/recommended', getRecommended);
router.get('/get-all', getAllProducts);
router.post('/add', addProduct);

module.exports = router;