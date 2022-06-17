const express = require('express');
const router = express.Router();
const {
    getPopular,
    getRecommended,
} = require('../controller/product');

router.get('/popular', getPopular);
router.get('/recommended', getRecommended);


module.exports = router;