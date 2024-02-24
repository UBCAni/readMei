const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
    DATE: {
        type: String,
        required: true
    },
    MEMBERSHIP_NUMBER: {
        type: String,
        required: true
    },
    NAME: {
        type: String,
        required: true
    },
    EMAIL: {
        type: String,
        required: true
    },
    STUDENT_NUMBER: Number,
  });
  
  // Define API endpoints
  // app.get('/api/member/:membershipNumber', async (req, res) => {
  //   const membershipNumber = req.params.membershipNumber;
  
  //   try {
  //     const member = await Member.findOne({ membershipNumber: membershipNumber });
  //     if (member) {
  //       res.json(member);
  //     } else {
  //       res.status(404).json({ message: 'Member not found' });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Internal server error' });
  //   }
  // });

  module.exports = mongoose.model('member', MemberSchema);;