const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    
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
    text: {
        type: String,
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('comments', CommentSchema);