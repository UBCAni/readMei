const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HanamiAttendeeSchema = new Schema({
    NAME: {
        type: String,
        required: true
    },
    EMAIL: {
        type: String,
        required: true
    },
    TYPE_OF_TICKET: {
        type: String,
        required: true
    },
    BOUGHT_OPTIONAL_TIP: {
        type: Boolean,
    },
    CHECKED_IN: {
        type: Boolean,
    }
  });

  module.exports = mongoose.model('hanamiAttendee', HanamiAttendeeSchema);;