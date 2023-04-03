const express = require('express');
const app = express();

const errorHandler = app.use(function (err, req, res, next){
    console.error(err.stack);
    res.status(500).send(err.message)
})

module.exports = errorHandler;