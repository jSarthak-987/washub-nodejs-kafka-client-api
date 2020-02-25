'use strict';

const express = require('express');
const producerController = require('../controller/producer-controller');
const router = express.Router();

const producerPromisesHandler = routeHandler => (req, res, next, producer) => {
    Promise.resolve(routeHandler(req, res, next, producer)).catch((err) => res.send({err}));
}

module.exports = (producer) => {

    router.use('/publishmessage', (req, res, next) => {
        producerPromisesHandler(producerController.connectBroker(req, res, next, producer));
    });

    router.post('/publishmessage', (req, res, next) => {
        producerPromisesHandler(producerController.publishMessage(req, res, next, producer));
    });
    
    return router;
}