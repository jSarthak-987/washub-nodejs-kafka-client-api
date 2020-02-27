'use strict';

const { Kafka } = require('kafkajs');

module.exports = (KafkaConfig) => {
    const kafka = new Kafka(KafkaConfig);
    const admin = kafka.admin();

    const getAdmin = function() {
        return admin;
    }

    const startAdmin = async function () {
        await admin.connect();
        console.log("Connection Established Successfully!");
        // return connectionResult;
    }

    const stopAdmin = async function () {
        await admin.disconnect();
        console.log("Connection Disconnected Successfully!");
        // return disconnectionResult;
    }

    const getTopicMetadata = async function () {
        const topicMetadata = await admin.fetchTopicMetadata();
        console.log(topicMetadata);
        return topicMetadata;
    }

    const createTopic = async function (topicConfig) {
        const result = await admin.createTopics(topicConfig);
        console.log(result);
        return result;
    }

    return {
        getAdmin,
        startAdmin,
        stopAdmin,
        getTopicMetadata,
        createTopic
    }
}