const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    
    post_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('likes', LikeSchema);