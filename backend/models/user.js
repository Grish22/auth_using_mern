const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        default: 'user',
        enum: ['admin', 'user'],
    },

}
, {
    timestamps: true,}
);
module.exports = mongoose.model('User', userSchema);
