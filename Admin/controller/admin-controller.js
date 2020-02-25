'use strict';

module.exports = {
    async startAdmin (req, res, admin) {
        await admin.connect();
        console.log("Connection Established Successfully!");
        res.send({
            message: "Connection Established Successfully!"
        })
    },

    async stopAdmin (req, res, admin) {
        await admin.disconnect();
        console.log("Connection Disconnected Successfully!");
        res.send({
            message: "Connection Disconnected Successfully!"
        })
    },

    async getTopicMetadata (req, res, admin) {
        const topicMetadata = await admin.fetchTopicMetadata();
        res.send({
            topicMetadata
        });
    },

    async createTopic (req, res, admin) {
        const topicBody = req.body;
        await admin.createTopics(topicBody);
        res.send({
            message: "Topic created successfully!"
        });
    }
}