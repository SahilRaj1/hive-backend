const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
    },
    caption: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model('posts', PostSchema);