'use strict';

const express = require('express');
const adminController = require('../controller/admin-controller');
const router = express.Router();

const adminPromisesHandler = routeHandler => (req, res, admin) => {
    Promise.resolve(routeHandler(req, res, admin)).catch((err) => res.send({err}));
}

module.exports = (admin) => {

    router.get('/startadmin', (req, res) => {
        adminPromisesHandler(adminController.startAdmin(req, res, admin));
    });

    router.get('/stopadmin', (req, res) => {
        adminPromisesHandler(adminController.stopAdmin(req, res, admin));
    });

    router.get('/topicmetadata', (req, res) => {
        adminPromisesHandler(adminController.getTopicMetadata(req, res, admin));
    });

    router.post('/createtopic', (req, res) => {
        adminPromisesHandler(adminController.createTopic(req, res, admin));
    });
    
    return router;
}