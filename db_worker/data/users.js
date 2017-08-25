const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;

let exportedMethods = {
    /*
        User Methods
     */
    getUsers() {
        return users().then((userCollection) => {
            return userCollection.find({}).toArray();
        })
    },

    getUser(id) {
        return users().then((userCollection) => {
            return userCollection
                .findOne({_id: id})
                .then((user) => {
                    if (!user)
                        throw "User not found";
                    return user;
                });
        });
    },

    insertUser(name, isAdmin) {
      return users().then((userCollection) => {
          let newUser = {
              name: name,
              isAdmin: isAdmin
          };

          return userCollection.insertOne(newUser).then((newInsertInfo) => {
              return newInsertInfo.insertedId;
          }).then((newId) => {
              return this.getUser(newId);
          })
      })
    },

    updateUser(id, user) {
        return users().then((userCollection) => {
            let updatedData = {};

            if (user.name) updatedData.name = user.name;
            if (user.isAdmin) updatedData.isAdmin = user.isAdmin;

            return taskCollection.updateOne({_id: id}, {$set: updatedData}).then((result) => {
                return this.getUser(id);
            })
        })
    }
};

module.exports = exportedMethods;