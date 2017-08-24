const bluebird = require("bluebird");
const redis = require('redis');
const redisConnection = require("./redis-connection");
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// getById = ((id) => {
//     return new Promise((resolve, reject) => {
//
//         hasUser = false;
//         user = null
//
//         for (let i = 0; i < json.length; i++) {
//             if (json[i].id == id) {
//                 hasUser = true;
//                 user = json[i];
//                 break;
//             }
//         }
//
//         if (hasUser) {
//             resolve(user);
//         } else {
//             reject("User not found!");
//         }
//     });
// });
//
// insertPerson = ((person) => {
//     return new Promise((resolve, reject) => {
//         if (json.push(person)) {
//             resolve(person);
//         } else {
//             reject("Failed to insert new person!");
//         }
//     });
// });
