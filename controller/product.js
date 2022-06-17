let popular = require('./../data/popular.json');
let recommended = require('./../data/recommended.json');

exports.getPopular = async (req, res) => {
    res.json(popular);
};

// add product
exports.getRecommended = async (req, res) => {
    res.json(recommended);
};