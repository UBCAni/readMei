const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require("./schema")

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

const memberSchema = schema.MemberSchema
const eventSchema = schema.EventSchema

mongoose.connect('mongodb://localhost/readmei', { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/members", (request, response) => {
    // request should look like {MEMBER_ID: "2023-2024 001"}
    try {
        let results
        results = memberSchema.statics.find(request)
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

app.get("/events", (request, response) => {
    try {
        results = eventSchema.statics.find(request.query)
        results.length() ? response.send(results) : response.status(404).send("No records found")
    } catch {
        response.status(404).send("Bad query")
    }
})

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