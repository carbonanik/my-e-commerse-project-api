const express = require('express');
const cors = require('cors');
const db = require('./config/database')
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

const product = require('./routes/product');

app.use('/api/product', product);
app.use('/images', express.static('images'));

db.authenticate()
    .then(() => {
        console.log('Database connection has been established successfully')
    })
    .catch((err) => {
        confirm.log('Unable to connect to database:', err)
    });

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); 
});