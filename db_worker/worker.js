const bluebird = require("bluebird");
const redis = require('redis');
const redisConnection = require("./redis-connection");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

console.log("DB worker process running");

/*
    Redis Request Handlers
 */
redisConnection.on('get-users:request:*', async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;

    try {
        let response = await getUserByID(message.data.userID);

        let successEvent = `${eventName}:success:${requestId}`;
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: {
                response: response
            },
            eventName: eventName
        });
    } catch(e) {
        console.log(e);

        let failureEvent = `${eventName}:failure:${requestId}`;
        redisConnection.emit(failureEvent, {
            requestId: requestId,
            data: {
                response: e
            },
            eventName: eventName
        });
    }
});