const express = require('express');
const router = express.Router();
const {
    getUserByToken,
    signup,
} = require('../controller/user');

router.get('/get-by-token', getUserByToken);
router.post('/signup', signup);

module.exports = router;