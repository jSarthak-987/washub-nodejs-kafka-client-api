'use strict';

/* 
    index.js file, which returns all routes of producer client
    params -> KafkaConfig: config of kafka client like clientId and Brokers Array
              ProducerConfig: config of Producer
*/

const producerRoutes = require('./routes/producer-routes');

// const ProducerConfig = {
//     groupId: process.env.PRODUCER_GROUP_ID
// }

module.exports = (KafkaConfig)=> {
    const producer = KafkaConfig.producer();
    return producerRoutes(producer);
}