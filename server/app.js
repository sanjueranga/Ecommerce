const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.use(express.json());

//Import all routes
const products = require('./routes/product');

app.use('/',products);


app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app

