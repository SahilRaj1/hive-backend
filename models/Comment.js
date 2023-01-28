const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    
    post_id: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    created_on: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Comment', CommentSchema);