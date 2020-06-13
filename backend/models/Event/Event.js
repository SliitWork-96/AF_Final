const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Event = new Schema({

    EventID: {
        type: String,
        required: true
    },

    EventDate: {
        type: String,
        required: true
    },
  
    CustomerFName: {
        type: String,
        required: true
    },

    CustomerLName: {
        type: String,
        required: true
    },

    CustomerEmail: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    contact: {
        type: String,
        required: true
    },

    address: {
        type:String,
        required: true
    },

    EventType: {
        type: String,
        required: true
    },

    SubType: {
        type: String,
        required: true
    },

    stages: {
        type: [{
            stageNo: {
                type: Number
            },
            stage: {
                type: String
            }
        }]
    },

    description: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true,
        default:0
    },
},
{
    collection: 'Event'
});

module.exports = mongoose.model('Event',Event);
