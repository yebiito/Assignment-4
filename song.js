const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    duration: { type: Number, required: true }
});

module.exports = mongoose.model('Song', songSchema);
