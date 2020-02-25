'use strict';

const express = require('express');
const consumerController = require('../controller/consumer-controller');
const router = express.Router();

const consumerPromisesHandler = routeHandler => (req, res, next, consumer) => {
    Promise.resolve(routeHandler(req, res, next, consumer)).catch((err) => res.send({err}));
}

module.exports = (consumer) => {

    router.use('/consumenext', (req, res, next) => {
        consumerPromisesHandler(consumerController.subscribeTopic(req, res, next, consumer));
    });

    router.get('/consumenext', (req, res, next) => {
        consumerPromisesHandler(consumerController.readMessage(req, res, next, consumer));
    });
    
    return router;
}