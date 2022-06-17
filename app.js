const express = require('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT || 5000;

const product = require('./routes/product');

app.use('/api/product', product);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`); 
});

//https://mighty-crag-04913.herokuapp.com/api/product/recommended
