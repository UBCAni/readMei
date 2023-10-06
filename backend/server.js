const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require("./schema")
const { MongoClient } = require("mongodb");
const fs = require("fs")
const http = require("http")
const https = require("https")

const app = express();
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.listen(PORT, () => {
    console.log("App is running on port " + PORT)
})

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



app.get("/test", (request, response) => {
    console.log("hi from server")
    response.send("hi from server")
})

// members route
app.get("/members", (request, response) => {
    try {
        let results
        query("members", request.body).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

app.post("/members", (request, response) => {
    try {
        let results
        write("members", request.body).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(500).send("Error writing record")
    }
})

app.patch("/members", (request, response) => {
    try {
        let results
        update("members", request.body).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(500).send("Error updating record")
    }
})

app.get("/events", (request, response) => {
    try {
        let results
        query("events", request.body).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

app.post("/events", (request, response) => {
    try {
        let results
        write("events", request.body).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(500).send("Error writing record")
    }
})

app.patch("/events", (request, response) => {
    try {
        let results
        update("events", request.body).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(500).send("Error updating record")
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

// query parser
function splitQuery(query) {
    let result = {}
    const args = query.toString().split("&&")
    for (const arg of args) {
        const key_value = arg.split("=")
        result[key_value[0]] = result[key_value[1]]
    }
    return result
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
