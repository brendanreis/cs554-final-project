const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

app.use(bodyParser.json());

app.get("/api", async (req, res) => {
    res.send("API Server");
});

/*
    Users
 */
app.get("/api/users", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-users"
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.get("/api/users/:slug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-user",
            data: {
                userId: req.params.slug
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.post("/api/users", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post-user",
            data: {
                user: req.body.user
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.put("/api/users/:slug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "put-user",
            data: {
                userId: req.params.slug,
                user: req.body.user
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});


/*
    Structures
 */
app.get("/api/structures", async (req, res) => {
    try {
        console.log("API server received request");
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-structures"
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.get("/api/structures/:slug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-structure",
            data: {
                structureId: req.params.slug
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.post("/api/structures", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post-structure",
            data: {
                structure: req.body.structure
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.put("/api/structures/:slug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "put-structure",
            data: {
                structureId: req.params.slug,
                structure: req.body.structure
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});


/*
    StructureEntries Entries
 */
app.get("/api/structures/:slug/entries", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-entries",
            data: {
                structureId: req.params.slug
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.get("/api/structures/:slug/:entryslug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "get-entry",
            data: {
                structureId: req.params.slug,
                entryId: req.params.entryslug
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});

app.post("/api/structures/:slug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post-entry",
            data: {
                structureId: req.params.slug,
                entry: req.body.entry
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});


app.put("/api/structures/:slug/:entryslug", async (req, res) => {
    try {
        let response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "put-entry",
            data: {
                structureId: req.params.slug,
                entryId: req.params.entryslug,
                entry: req.body.entry
            }
        });

        res.json(response);
    } catch (e) {
        res.json({error: e.message});
    }
});


/*
    StructureEntries Entry Comments
 */
app.post("/api/structures/:slug/:entryslug/comments", async (req, res) => {
    try {
        const response = await nrpSender.sendMessage({
            redis: redisConnection,
            eventName: "post-comment",
            data: {
                structureId: req.params.slug,
                entryId: req.params.entryslug,
                comment: req.body.comment
            }
        })
    } catch(e) {
        res.json({error: e.message});
    }
});


app.listen(3001, () => {
    console.log("API server is now running on http://localhost:3001");
});