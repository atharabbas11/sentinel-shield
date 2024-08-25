// Contact message schema

const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        message: String
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
