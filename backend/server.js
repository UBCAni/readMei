const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require("./schema")
const { MongoClient } = require("mongodb");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());


let collections = {}
let db

let url = fs.readFileSync("./secret.txt", {encoding: "utf8"})

// Replace the following with your Atlas connection string                                                                                                                                        

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
    if (db === undefined) throw new Error
    if (collections.members === undefined || collections.events === undefined) throw new Error
    return true
}


ready().then(() => {
    console.log("Successfully connected to Atlas")
})

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



app.get("/members", (request, response) => {
    // request should look like {type: "read/write/update", query: {MEMBER_ID: "2023-2024 001"}}
    try {
        let results
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

app.get("/events", (request, response) => {
    try {
        let results
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


async function query(collection, query) {
    const results = await Promise.resolve(
        client.db("UBCANI").collection(collection).find(query).toArray()
    )
    return results
}

async function write(collection, query) {
    const read_results = await Promise.resolve(
        client.db("UBCANI").collection(collection).find(query).toArray()
    )
    const first_result = await Promise.resolve(
        client.db("UBCANI").collection(collection).findOne()
    )
    if (!read_results.length) {
        if (!isValidQuery(query, Object.keys(first_result).length)) return undefined
        const results = await Promise.resolve(
            client.db("UBCANI").collection(collection).insertOne(query)
        )
        return results
    }
}

async function update(collection, query) {
    const read_results = await Promise.resolve(
        client.db("UBCANI").collection(collection).find({MEMBER_ID: query.MEMBER_ID}).toArray()
    )
    if (read_results.length) {   
        if (!isValidQuery(query, Object.keys(read_results[0]).length)) return undefined
        const results = await Promise.resolve(
            client.db("UBCANI").collection(collection).replaceOne({MEMBER_ID: query.MEMBER_ID}, query)
        )
        return results
    }
}

function isValidQuery(query, length) {
    if (Object.keys(query).length + 1 !== length) return false
    for (const i of Object.values(query)) {
        if (i === undefined) return false
    }
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
