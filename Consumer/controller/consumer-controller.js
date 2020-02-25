'use strict';

module.exports = {
    async subscribeTopic (req, res, next, consumer) {
        const subscribeConfig = {};
        subscribeConfig.topic = req.query.topic;
        subscribeConfig.fromBeginning = req.query.frombeginning;
        
        await consumer.connect();
        await consumer.subscribe(subscribeConfig);
        console.log("Subscribed Successfully");
        next();
    },

    async readMessage(req, res, next, consumer) {
        const resMessage = {};

        res.writeHead(200, {'Content-Type': 'text/plain'});

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                // resMessage.key = message.key.toString();
                // resMessage.value = message.value.toString();
                // resMessage.headers = message.headers;
                
                res.write(message.value.toString());
            },
        });

        // res.send(resMessage);
    }
}