'use strict';

const { Kafka } = require('kafkajs');
const express = require('express');
const adminIndex = require('./Admin/index');
// const consumerIndex = require('./Consumer/index');
const producerIndex = require('./Producer/index');
const bodyParser = require('body-parser');

const app = express();
require('dotenv').config();

const KafkaClientId = process.env.KAFKA_CLIENT_ID;
const KafkaBrokers = process.env.KAFKA_BROKERS.split(",");

const KafkaConfig = new Kafka({
    clientId: KafkaClientId,
    brokers: KafkaBrokers
});

// const ConsumerConfig = {
//     groupId: process.env.CONSUMER_GROUP_ID
// }

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/v1/dev/kafka/admin', adminIndex(KafkaConfig));
// app.use('/api/v1/dev/kafka/consumer', consumerIndex(KafkaConfig, ConsumerConfig));
app.use('/api/v1/dev/kafka/producer', producerIndex(KafkaConfig));

app.listen(4040);