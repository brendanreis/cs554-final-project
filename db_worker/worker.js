const bluebird = require("bluebird");
const redis = require('redis');
const redisConnection = require("./redis-connection");
const client = redis.createClient();
const data = require("./data");
const structures = data.structures;
const users = data.users;

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

console.log("DB worker process is now running");

/*
    Redis Request Handler
 */
redisConnection.on('*:request:*', async (message, channel) => {
    const requestId = message.requestId;
    const eventName = message.eventName;

    console.log("DB worker received request");

    try {
        let response = null;

        switch(eventName) {
            // Users
            case "get-users": {
                response = await users.getUsers();
                break;
            }
            case "get-user": {
                response = await users.getUser(message.data.userId);
                break;
            }
            case "post-user": {
                const user = message.data.user;
                response = await users.insertUser(user.name, user.isAdmin);
                break;
            }
            case "put-user": {
                response = await users.updateUser(message.data.userId, message.data.user);
                break;
            }
            // Structures
            case "get-structures": {
                response = await structures.getStructures();
                break;
            }
            case "get-structure": {
                response = await structures.getStructure(message.data.structureId);
                break;
            }
            case "post-structure": {
                const structure = message.data.structure;
                response = await structures.insertStructure(structure._id, structure.name, structure.description,
                    structure.pageSize, structure.fields, []);
                break;
            }
            case "put-structure": {
                response = await structures.updateStructure(message.data.structureId, message.data.structure);
                break;
            }
            // Structure Entries
            case "get-entries": {
                response = await structures.getEntries(message.data.structureId);
                break;
            }
            case "get-entry": {
                response = await structures.getEntry(message.data.structureId, message.data.entryId);
                break;
            }
            case "post-entry": {
                const entry = message.data.entry;
                response = await structures.insertEntry(message.data.structureId, entry.id, entry.title, entry.blurb,
                    entry.author, entry.createdDate, entry.fields, []);
                break;
            }
            case "put-entry": {
                response = await structures.updateEntry(message.data.structureId, message.data.entryId,
                    message.data.entry);
                break;
            }
            // Structure Entry Comments
            case "post-comment": {
                const comment = message.data.comment;
                response = await structures.insertComment(message.data.structureId, message.data.entryId,
                    comment.author, comment.text);
                break;
            }
        }

        const successEvent = `${eventName}:success:${requestId}`;
        redisConnection.emit(successEvent, {
            requestId: requestId,
            data: {
                response: response
            },
            eventName: eventName
        });
    } catch(e) {
        console.log(e);

        const failureEvent = `${eventName}:failure:${requestId}`;
        redisConnection.emit(failureEvent, {
            requestId: requestId,
            data: {
                response: e
            },
            eventName: eventName
        });
    }
});