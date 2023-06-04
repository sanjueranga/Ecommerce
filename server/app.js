const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const errorMiddleware = require('./middlewares/errors');


app.use(express.json());

//Import all routes
const products = require('./routes/product');

app.use('/',products);

app.use(errorMiddleware);


app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

