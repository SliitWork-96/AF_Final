const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventPackage = new Schema({

    EventPackageID: {
        type: String,
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

    PackagePrice: {
        type: Number,
        required: true,
        default:0
    },

    images: {
        type: Array,
        default:[]
    },
},
{
    collection: 'EventPackage'
});

module.exports = mongoose.model('EventPackage',EventPackage);
