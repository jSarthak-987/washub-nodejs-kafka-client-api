'use strict';

/* 
    index.js file, which returns all routes of producer client
    params -> KafkaConfig: config of kafka client like clientId and Brokers Array
              ProducerConfig: config of Producer
*/

const { Kafka } = require('kafkajs');

module.exports = (KafkaConfig, ProducerConfig) => {
    const kafka = new Kafka(KafkaConfig);
    const producer = kafka.producer(ProducerConfig);

    const getProducer = function() {
        return producer;
    }

    const connectBroker = async function() {
        const connection = await producer.connect();
        console.log("Producer Connected Successfully!");
        return connection;
    }

    const publishMessage = async function (message) {
        const result = await producer.send(message);
        return result;
    }

    return {
        connectBroker,
        publishMessage,
        getProducer
    };
}