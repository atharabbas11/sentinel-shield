// models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        profileImage: { 
            type: String,
            default: '' 
        }, // To store image path

        backgroundImage: {
            type: String,
            default: ''
        }, // To store background image path

        name: {
            type: String,
            required: true,
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

        // Fields for reset password process
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },

        // Fields for email change process
         emailChangeToken: {
            type: String,
        },
        emailChangeExpires: {
            type: Date,
        },
        newEmail: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
