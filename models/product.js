const Sequelize =  require('sequelize');
const db = require('../config/database');

const product = db.define(
    'product', {
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        stars: {
            type: Sequelize.FLOAT,
            defaultValue: 0
        },
        img: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        type_id:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }
);

product.sync()
    .then(() => {
        console.log('Product table crated successfully');
    })
// .then(function(){
//     return db.drop(); // drop all tables in the db
//   });

module.exports = product;