const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

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
        type: String
    },
    following: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }],
    followers: [{
        type: mongoose.Schema.ObjectId,
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

module.exports = mongoose.model('users', UserSchema);