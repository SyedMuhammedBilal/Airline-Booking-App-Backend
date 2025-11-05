const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
    airline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AIRLINE', // Reference to the Airline model
        required: true
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    departureAirport: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    arrivalAirport: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    departureTime: {
        type: Date,
        required: true
    },
    arrivalTime: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    capacity: {
        type: Number,
        required: true,
        min: 1
    },
    availableSeats: {
        type: Number,
        default: function() {
            return this.capacity;
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

// Add a pre-save hook to ensure arrivalTime is after departureTime
flightSchema.pre('save', function(next) {
    if (this.departureTime >= this.arrivalTime) {
        return next(new Error('Arrival time must be after departure time.'));
    }
    next();
});

const Flight = mongoose.model('FLIGHT', flightSchema);

module.exports = Flight;