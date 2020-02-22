'use strict';

const { Kafka } = require('kafkajs');
const express = require('express');
const adminIndex = require('./Admin/index');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

const KafkaClientId = process.env.KAFKA_CLIENT_ID;
const KafkaBrokers = process.env.KAFKA_BROKERS.split(",");

const KafkaConfig = new Kafka({
    clientId: KafkaClientId,
    brokers: KafkaBrokers
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/dev/kafka', adminIndex(admin));

app.listen(4040);