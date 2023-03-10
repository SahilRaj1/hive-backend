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
    created_on: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('likes', LikeSchema);