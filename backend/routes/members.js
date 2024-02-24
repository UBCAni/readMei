const express = require('express');
const Member = require('../models/MemberModel');
const {getMember, addMember, updateMember} = require('../controllers/memberController');

const router = express.Router();

router.get("/", getMember);

router.post("/", addMember);

router.patch("/", updateMember);

router.delete("", async (request, response) => {
    // TODO?
});

module.exports = router;