const mongoCollections = require("../config/mongoCollections");
const structures = mongoCollections.structures;
const microEnum = require("simple-enum");

let exportedMethods = {
    /*
        Structure Methods
     */
    getStructures() {
        return structures().then((structureCollection) => {
            return structureCollection.find({}).toArray();
        });
    },

    getStructure(id) {
        return structures().then((structureCollection) => {
            return structureCollection
                .findOne({_id: id})
                .then((structure) => {
                    if (!structure)
                        throw "Structure not found";
                    return structure;
                });
        });
    },

    insertStructure(id, name, description, pageSize, fields, entries) {
        return structures().then((structureCollection) => {
            const newStructure = {
                _id: id,
                name: name,
                description: description,
                pageSize: pageSize,
                fields: fields,
                entries: entries
            };

            return structureCollection.insertOne(newStructure).then((result) => {
                return result.insertedId;
            }).then((newId) => {
                return this.getStructure(newId);
            })
        });
    },

    updateStructure(id, structure) {
        return structures().then((structureCollection) => {
            const updatedData = {};

            if (structure.name) updatedData.name = structure.name;
            if (structure.description) updatedData.description = structure.description;
            if (structure.pageSize) updatedData.pageSize = structure.pageSize;
            if (structure.fields) updatedData.fields = structure.fields;
            if (structure.entries) updatedData.entries = structure.entries;

            return structureCollection.updateOne({_id: id}, {$set: updatedData}).then(() => {
                return this.getStructure(id);
            })
        });
    },


    /*
        Structure Entry Methods
    */
    getEntries(structureId) {
        return structures().then((structureCollection) => {
            return structureCollection
                .findOne({_id: structureId})
                .then((structure) => {
                    if (!structure)
                        throw "Structure not found";
                    return structure.entries;
                });
        });
    },

    getEntry(structureId, entryId) {
        return structures().then((structureCollection) => {
            return structureCollection
                .findOne({_id: structureId})
                .then((structure) => {
                    if (!structure)
                        throw "Structure not found";
                    return structure.entries;
                }).then((entries) => {
                    for (let i = 0; i < entries.length; i++) {
                        if (entries[i].id === entryId) {
                            return entries[i];
                        }
                    }
                    throw "Entry not found";
                });
        });
    },

    insertEntry(structureId, entryId, title, blurb, author, createdDate, fields, comments) {
        return structures().then((structureCollection) => {
            const newEntry = {
                id: entryId,
                title: title,
                blurb: blurb,
                author: author,
                createdDate: createdDate,
                fields: fields,
                comments: comments
            };

            const updateCommand = {
                $push: {entries: newEntry}
            };

            return structureCollection.updateOne({_id: structureId}, updateCommand).then((result) => {
                return this.getStructure(structureId);
            })
        });
    },

    updateEntry(structureId, entryId, updatedEntry) {
        return structures().then((structureCollection) => {
            const updatedData = {};

            if (structure.title) updatedData.title = structure.title;
            if (structure.blurb) updatedData.blurb = structure.blurb;
            if (structure.author) updatedData.author = structure.author;
            if (structure.createdDate) updatedData.createdDate = structure.createdDate;
            if (structure.fields) updatedData.fields = structure.fields;
            if (structure.comments) updatedData.comments = structure.comments;

            const updateCommand = {
                $set: {"entries.$": updatedData}
            };

            return structureCollection.updateOne({_id: structureId, "entries.id": entryId}, updateCommand)
                .then(() => {
                    return this.getStructure(structureId);
                });
        });
    },


    /*
        Entry Comment Methods
    */
    insertComment(structureId, entryId, author, text) {
        return structures().then((structureCollection) => {
            const newComment = {
                author: author,
                text: text
            };

            const updateCommand = {
                $push: {"entries.$.comments": newComment}
            };

            return structureCollection.updateOne({_id: structureId, "entries.id": entryId}, updateCommand)
                .then(() => {
                    return this.getStructure(structureId);
                });
        })
    }

};

module.exports = exportedMethods;