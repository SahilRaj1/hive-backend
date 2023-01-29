const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profile_pic: {
        data: Buffer,
        contentType: String
    },
    bio: {
        type: String,
        required: true
    },
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    created_on: {
        type: Date,
        default: Date.now
    },
    updated_on: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', UserSchema);