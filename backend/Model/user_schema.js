const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true,
        unique: true
    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        required: true,
        enum:['admin', 'user','employee'],
        default: 'user'
    }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);
