const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },
    country: {
        type: String,
        required: true,
        trim: true
    },
    // You can add more fields here, e.g.,
    // website: {
    //     type: String,
    //     trim: true
    // },
    // contactEmail: {
    //     type: String,
    //     trim: true,
    //     lowercase: true
    // }
});

const Airline = mongoose.model('AIRLINE', airlineSchema);

module.exports = Airline;