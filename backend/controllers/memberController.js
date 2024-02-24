const Member = require('../models/MemberModel');

const validData = {
        DATE: "",
        MEMBERSHIP_NUMBER: "",
        NAME: "",
        EMAIL: "",
        STUDENT_NUMBER: ""
    }


// get 1 member
const getMember = async (request, response) => {
    try {
        const member = await Member.find(request.query);
        if (member) {
            response.json(member);
        } else {
            response.status(404).send("No record found");
        }
    } catch (err) {
        console.log(err);
        response.status(404).send("Bad query")
    }
}

// post 1 member

const addMember = async (request, response) => {
    const query = request.query;
    try {
        if (!isValidQuery(query)) {
            response.status(404).send("Invalid query");
        }
        const read_results = await Member.find({MEMBERSHIP_NUMBER: query.MEMBERSHIP_NUMBER});
        if (!read_results.length) {
            const newMember = Member.create(query);
            response.json(newMember);
        }
    } catch (err) {
        response.status(404).send("Bad query");
    }
}

// update 1 member

const updateMember = async (request, response) => {
    const query = request.query;
    try {
        if (!isValidQuery(query)) {
            response.status(404).send("Invalid query");
        }
        const read_results = await Member.find({MEMBERSHIP_NUMBER: query.MEMBERSHIP_NUMBER});
        if (read_results.length) {
            const updatedMember = await Member.findOneAndUpdate({MEMBERSHIP_NUMBER: query.MEMBERSHIP_NUMBER}, query);
            response.json(updatedMember);
        }
    } catch (err) {
        console.log(err);
        response.status(404).send("Bad query");
    }
}

function isValidQuery(query) {
    // get the right schema
    const valid = Object.keys(validData)
    // check if each key is defined
    for (const i of valid) {
        if (query[i] === undefined) return false
    }
    // check if there are no additional keys
    if (Object.keys(query).length !== valid.length) return false
    return true
}


module.exports = {
    getMember,
    addMember,
    updateMember
}