'use strict';

/* 
    index.js file, which returns all routes of consumer client
    params -> KafkaConfig: config of kafka client like clientId and Brokers Array
              ConsumerConfig: config of Consumer Group; property of groupId
*/

const consumerRoutes = require('./routes/consumer-routes');

module.exports = (KafkaConfig) => {
    const consumer = KafkaConfig.consumer(ConsumerConfig);
    return consumerRoutes(consumer);
}