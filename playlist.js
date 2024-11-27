const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    genre: { type: String, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
    totalMinutes: { type: Number, default: 0 },
    listeners: { type: Number, default: 0 },
    dj: { type: mongoose.Schema.Types.ObjectId, ref: 'DJ' }
});

module.exports = mongoose.model('Playlist', playlistSchema);
