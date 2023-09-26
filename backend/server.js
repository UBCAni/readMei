const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

mongoose.connect('mongodb://localhost/readmei', { useNewUrlParser: true, useUnifiedTopology: true });

// const MemberSchema = new mongoose.Schema({
//     date: String,
//     name: String,
//     email: String,
//     membershipNumber: Number,
//     studentNumber: Number,
//     membershipType: String,
//     paymentMethod: String,
//   });

const MemberSchema = new mongoose.Schema({
    DATE: Date,
    MEMBER_ID: String,
    NAME: String,
    EMAIL: String
},
{
    statics: {
        findById(id) {
            return this.find({MEMBER_ID: id})
        },
        findByName(name) {
            return this.find({NAME: name}) // maybe implement fuzzy
        },
        findByEmail(email) {
            return this.find({EMAIL: email}) // maybe implement fuzzy
        },
        isValidEmail(email) {
            return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) !== null
        }
    },
    virtuals: {
        joinYear: {
            get() {
                return this.DATE.getFullYear()
            }
        },
        membershipNumber: {
            // assumes that MEMBER_ID is in "YYYY-YYYY XX" format
            get() {
                return /[^ ]*$/.exec(this.MEMBER_ID)[0] // trust me bro
            }
        }
    }
})

const EventSchema = new mongoose.Schema({
    MEMBER_ID: String,
    EVENT_NAME: String,
    EVENT_DATE: Date,
    ATTENDEE_TYPE: String
},
{
    statics: {
        getAllEvents(id) {
            return this.find({MEMBER_ID: id})
        },
        getAllVolunteeredEvents(id) {
            return this.find({MEMBER_ID: id, TYPE: "Volunteer"})
        },
        getAllEventsBetween(start = undefined, end) {
            try {
                return this.find({EVENT_DATE: {$gte: start, $lte: end}})
            } catch {
                return this.find({EVENT_DATE: {$gte: end}})
            }
        },
        getAllEventsBefore(end) {
            return this.find({EVENT_DATE: {$lte: end}})
        },
        getAllAttendees(name) {
            let attendees = []
            for (const i of this.find({EVENT_NAME: name})) {
                attendees.push({
                    NAME: i.NAME,
                    MEMBER_ID: i.MEMBER_ID
                })
            }
            return attendees
        },
        getAllVolunteers(name) {
            let volunteers = []
            for (const i of this.find({EVENT_NAME: name, ATTENDEE_TYPE: "Volunteer"})) {
                volunteers.push({
                    NAME: i.NAME,
                    MEMBER_ID: i.MEMBER_ID
                })
            }
            return volunteers
        }
    }
})
  
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