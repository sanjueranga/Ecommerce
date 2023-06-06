const express = require("express");
const bodyParser = require("body-parser")
const app = express();

const errorMiddleware = require('./middlewares/errors');


app.use(express.json());

//Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
// const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api/v1', products);
app.use('/api/v1', auth);
// app.use('/api/v1', payment);
app.use('/api/v1', order);

app.use(errorMiddleware);


app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app

