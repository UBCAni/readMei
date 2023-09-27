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

app.get("/members", (request, response) => {
    // request should look like {MEMBER_ID: "2023-2024 001"}
    try {
        let results
        query("members", request).then((r) => {
            results = r
        })
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

app.get("/events", (request, response) => {
    try {
        let results
        query("events", request).then((r) => {
            results = r
        })
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
