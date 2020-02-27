'use strict';

/*TopicConfig => {
    validateOnly: <boolean>,
    waitForLeaders: <boolean>
    timeout: <Number>,
    topics: <Topic[]>,

    topics: -> 
    {
            topic: <String>,
            numPartitions: <Number>,     // default: 1
            replicationFactor: <Number>, // default: 1
            replicaAssignment: <Array>,  // Example: [{ partition: 0, replicas: [0,1,2] }] - default: []
            configEntries: <Array>       // Example: [{ name: 'cleanup.policy', value: 'compact' }] - default: []
        }
}*/

// const { Kafka } = require('kafkajs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Admin = require('./Admin/admin');

require('dotenv').config();

const KafkaClientId = process.env.KAFKA_CLIENT_ID;
const KafkaBrokers = process.env.KAFKA_BROKERS.split(",");

const KafkaConfig = {
    clientId: KafkaClientId,
    brokers: KafkaBrokers
};

const Topics = {
    topics: [
        { topic: 'DEMO_TOPIC', numPartitions: 1},
    ]
}

const admin = Admin(KafkaConfig);

const AdminPromiseResolveHandler = routeHandler => () => {
    Promise.resolve(routeHandler()).catch((err) => {
            console.err(err);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.on('connection', (app) => {
//     AdminPromiseResolveHandler(admin.getAdmin());
//     AdminPromiseResolveHandler(admin.createTopic(Topics));
// })

app.listen(4040, () => {
    AdminPromiseResolveHandler(admin.getAdmin());
    AdminPromiseResolveHandler(admin.createTopic(Topics));
});