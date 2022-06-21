const Sequelize =  require('sequelize');
const db = require('../config/database');

const user = db.define(
    'user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profile_img: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.TEXT
        },
        role:{
            type: Sequelize.INTEGER
        },
        token: {
            type: Sequelize.STRING
        }
    }
);

user.sync()
    .then(() => {
        console.log('User table crated successfully');
    })
// .then(function(){
//     return db.drop(); // drop all tables in the db
//   });

module.exports = user;