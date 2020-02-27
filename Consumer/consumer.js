'use strict';

/* 
    index.js file, which returns all routes of producer client
    params -> KafkaConfig: config of kafka client like clientId and Brokers Array
              ProducerConfig: config of Producer
*/

const { Kafka } = require('kafkajs');


module.exports = (KafkaConfig, ConsumerConfig) => {
    const kafka = new Kafka(KafkaConfig);
    const consumer = kafka.consumer(ConsumerConfig);

    const subscribeTopic = async function (subscribeConfig) {
        await consumer.connect();
        const subscribedConsumer = await consumer.subscribe(subscribeConfig);
        console.log("Subscribed Successfully");
        return (subscribedConsumer);
    },

    const readMessage = async function (message) {
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // resMessage.key = message.key.toString();
                // resMessage.value = message.value.toString();
                // resMessage.headers = message.headers;
            },
        });
    }

    const getConsumer = function() {
        return consumer;
    }

    return {
        subscribeTopic,
        readMessage,
        getConsumer
    };
}