const express = require('express');
const router = express.Router();

const {
    getUserByToken,
    signup,
    signin,
    deleteUserByToken,
    signout,
} = require('../controller/user');

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
router.get('/get-by-token', getUserByToken);
router.get('/delete-by-token', deleteUserByToken);

module.exports = router;