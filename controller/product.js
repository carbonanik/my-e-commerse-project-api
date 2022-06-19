// let popular = require('../data/popular.json');
// let recommended = require('../data/recommended.json');
const ProductModel = require('../models/product')

exports.getPopular = async (req, res) => {
    try {
        const products = await ProductModel.findAll({where: {type_id: 2}});
        res.json(products);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

// add product
exports.getRecommended = async (req, res) => {
    try {
        const products = await ProductModel.findAll({where: {type_id: 3}});
        res.json(products);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.findAll();
        res.json(products);
    } catch (error){
        res.status(500).json({message: error.message});
    }
};

// exports.addMock = async (req, res) => {
//     try {

//         recommended.products.forEach( async (p) => {
//             delete p.id;
//             delete p.created_at;
//             delete p.updated_at;
//             console.log(p);
//             await ProductModel.create(p);
//         })
//         res.json({message: 'Successfully added mock data'});
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }

exports.addProduct = async (req, res) => {
    try{
        const product = await ProductModel.create(req.body);
        res.json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}