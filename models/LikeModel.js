const mongoose = require('mongoose');

const LikeSchema = mongoose.Schema({
    
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
    created_on: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Like', LikeSchema);