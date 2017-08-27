const data = require("./data");
const structureCollection = data.structures;
const userCollection = data.users;

let finishedUsers = false;
let finishedStructures = false;

/*
    Insert Users
 */
function createUser(name, isAdmin, signupDate, bio, favorites) {
    return {
        name: name,
        isAdmin: isAdmin,
        signupDate: signupDate,
        bio: bio,
        favorites: favorites
    }
}

async function insertUsers() {
    const userInserts = [];
    console.log(1);

    const users = [
        createUser("John Smitty", false, new Date(), "Like to do things sometimes", []),
        createUser("Max Smitty", false, new Date(), "Hates to do things", []),
        createUser("MegaMan76", true, new Date(), "He's a cool guy", [])
    ];

    for (let i = 0; i < users.length; i++) {
        userInserts.push(await userCollection.insertUser(users[i].name, users[i].isAdmin, users[i].signupDate, users[i].bio, users[i].favorites));
    }

    const response = await Promise.all(userInserts);

    finishedUsers = true;
}

insertUsers();

function wait() {
    console.log("Waiting...");
    if (!finishedUsers) {
        setTimeout(wait, 1000);
    } else {
        console.log("Finished all");
        process.exit();
    }
}

wait();

