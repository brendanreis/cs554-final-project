const dbConnection = require("./db_worker/config/mongoConnection");

dbConnection().then((db) => {
    return db.dropDatabase();
});