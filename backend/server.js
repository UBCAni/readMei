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