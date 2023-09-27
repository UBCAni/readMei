const mongoose = require("mongoose")

export const MemberSchema = new mongoose.Schema({
    DATE: Date,
    MEMBER_ID: String,
    NAME: String,
    EMAIL: String
},
{
    statics: {
        find(member) {
            return this.find(member)
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

export const EventSchema = new mongoose.Schema({
    MEMBER_ID: String,
    EVENT_NAME: String,
    EVENT_DATE: Date,
    ATTENDEE_TYPE: String
},
{
    statics: {
        find(event) {
            return this.find(event)
        }
    }
})