const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    img: {
        data: Buffer,
        contentType: String,
        required: true
    },
    caption: {
        type: String,
    },
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Post', PostSchema);