'use strict';

module.exports = {
    async connectBroker (req, res, next, producer) {
        await producer.connect();
        console.log("Producer Connected Successfully!");
        next();
    },

    async publishMessage(req, res, next, producer) {
        const message = req.body;

        const result = await producer.send(message);
        res.send({result});
    }
}