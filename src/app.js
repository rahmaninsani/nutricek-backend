require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');

const routes = require('./routes');

// App Setup
app.use(morgan('dev'));
app.use(express.json());

// Routes Setup
app.use(routes);

module.exports = app;
