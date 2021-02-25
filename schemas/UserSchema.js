const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true // will only accept unique values, no other can have same username
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true // will only accept unique values, no other can have same username
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "/images/profilePic.png"
    },
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);
module.exports = User;