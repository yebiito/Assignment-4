const mongoose = require('mongoose');

const timeslotSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    dj: { type: String, default: null }
});

module.exports = mongoose.model('Timeslot', timeslotSchema);
