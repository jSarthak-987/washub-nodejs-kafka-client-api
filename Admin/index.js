'use strict';

/* 
    index.js file, which returns all routes of admin client
    params -> KafkaConfig: config of kafka client like clientId and Brokers Array
*/

const adminRoutes = require('./routes/admin-routes');

module.exports = (KafkaConfig) => {
    const admin = KafkaConfig.admin();
    return adminRoutes(admin);
}