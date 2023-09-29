const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require("./schema")
const { MongoClient } = require("mongodb");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

// global collections and db variables for fast access
let collections = {}
let db

// data schema
const validData = {
    members: {
        MEMBER_ID: "",
        DATE: "",
        NAME: "",
        EMAIL: ""
    },
    events: {
        MEMBER_ID: "",
        EVENT_NAME: "",
        EVENT_DATE: "",
        ATTENDEE_TYPE: ""
    }
}

// secret key
let url = fs.readFileSync("./secret.txt", {encoding: "utf8"})                                                                                                                                  

// Connect to your Atlas cluster
const client = new MongoClient(url);
async function ready() {
    try {
        await client.connect().then(() => {
            db = client.db("UBCANI")
            collections.members = db.collection("members")
            collections.events = db.collection("events")
        })
    } catch (err) {
        throw err
    }
    // stop if variable gets assigned, but to undefined
    if (db === undefined) throw new Error
    if (collections.members === undefined || collections.events === undefined) throw new Error
    return true
}

// connect to atlas
ready().then(() => {
    console.log("Successfully connected to Atlas")
})

// testing
update("members", {
    DATE: Date.now(),
    MEMBER_ID: "lolmao",
    NAME: "HighTierKringe",
    EMAIL: "kys@now.com"
}).then(
    (r) => {
        query("members", {EMAIL: "kys@now.com"}).then((r) => {
            console.log(r)
        })
    }
)


// members route
app.get("/members", (request, response) => {
    // request should look like {type: "read/write/update", query: {MEMBER_ID: "2023-2024 001"}}
    try {
        let results
        // call right function based on request
        switch (request.type) {
            case "read":
                query("members", request.query).then((r) => {
                    results = r
                })
                break
            case "write":
                write("members", request.query).then((r) => {
                    results = r
                })
                break
            case "update":
                update("members", request.query).then((r) => {
                    results = r
                })
                break
        }
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

// events route
app.get("/events", (request, response) => {
    try {
        let results
        // call right function based on request
        switch (request.type) {
            case "read":
                query("events", request.query).then((r) => {
                    results = r
                })
                break
            case "write":
                write("events", request.query).then((r) => {
                    results = r
                })
                break
            case "update":
                update("events", request.query).then((r) => {
                    results = r
                })
                break
        }
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

// queries a collection with a query
// query is a key value pair of what you want to match
async function query(collection, query) {
    // create the promise
    const results = await Promise.resolve(
        // this value resolves to results
        client.db("UBCANI").collection(collection).find(query).toArray()
    )
    return results
}

// writes a query (data) to the collection
async function write(collection, query) {
    // validates data input
    if (!isValidQuery(collection, query)) return undefined
    // check for duplicates
    const read_results = await Promise.resolve(
        client.db("UBCANI").collection(collection).find(query).toArray()
    )
    // if the record doesn't exist in db yet
    if (!read_results.length) {
        // write to db and returns a WriteResult()
        const results = await Promise.resolve(
            client.db("UBCANI").collection(collection).insertOne(query)
        )
        return results
    }
}

// updates records, mainly for members collection only
// always updates based on member id
// only updates the first record found
async function update(collection, query) {
    // validates data input
    if (!isValidQuery(collection, query)) return undefined
    // check if the entry actually exists
    const read_results = await Promise.resolve(
        client.db("UBCANI").collection(collection).find({MEMBER_ID: query.MEMBER_ID}).toArray()
    )
    if (read_results.length) {
        // updates and returns a WriteResult()
        const results = await Promise.resolve(
            client.db("UBCANI").collection(collection).replaceOne({MEMBER_ID: query.MEMBER_ID}, query)
        )
        return results
    }
}

// data validation
function isValidQuery(collection, query) {
    // get the right schema
    const valid = Object.keys(validData[collection])
    // check if each key is defined
    for (const i of valid) {
        if (query[i] === undefined) return false
    }
    // check if there are no additional keys
    if (Object.keys(query).length + 1 !== valid.length) return false
    return true
}

// const MemberSchema = new mongoose.Schema({
//     date: String,
//     name: String,
//     email: String,
//     membershipNumber: Number,
//     studentNumber: Number,
//     membershipType: String,
//     paymentMethod: String,
//   });

  
//   const Member = mongoose.model('Member', MemberSchema);
  
//   // Define API endpoints
//   app.get('/api/member/:membershipNumber', async (req, res) => {
//     const membershipNumber = req.params.membershipNumber;
  
//     try {
//       const member = await Member.findOne({ membershipNumber: membershipNumber });
//       if (member) {
//         res.json(member);
//       } else {
//         res.status(404).json({ message: 'Member not found' });
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });
  
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
