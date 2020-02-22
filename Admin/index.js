'use strict';

// const { Kafka } = require('kafkajs');
const express = require('express');
const adminRoutes = require('./routes/admin-routes');
const router = express.Router();
// const bodyParser = require('body-parser');

module.exports = (KafkaConfig) => {
    // require('dotenv').config();

    // const KafkaClientId = process.env.KAFKA_CLIENT_ID;
    // const KafkaBrokers = process.env.KAFKA_BROKERS.split(",");

    // const KafkaConfig = new Kafka({
        // clientId: KafkaClientId,
        // brokers: KafkaBrokers
    // });
    // 
    const admin = KafkaConfig.admin();

    router.use(bodyParser.json());
    router.use(bodyParser.urlencoded({extended: false}));

    router.use('/admin', adminRoutes(admin));
}