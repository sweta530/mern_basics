const mongoose = require('mongoose')
require('./connection');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: String,
    rating: String,
    category: String,
    brand: String,
    product_image: String,
});

const Product = mongoose.model('products', productSchema);

module.exports = Product