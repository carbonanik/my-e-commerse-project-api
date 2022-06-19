const Sequelize = require('sequelize');


module.exports = new Sequelize({
    database: "d5kjgg14la6g3a",
    username: "uvydmegvxwfgbe",
    password: "091b716a2ebfdb5e4dca530a189c0292be2ec71f7130069377c98dc2618c4a2f",
    host: "ec2-52-204-195-41.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true, // This will help you. But you will see nwe error
            rejectUnauthorized: false // This line will fix new error
        }
    },
});