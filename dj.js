const mongoose = require('mongoose'); 

const djSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    role: { type: String, default: 'DJ' }, 
    playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' }] 
});

module.exports = mongoose.model('DJ', djSchema);

