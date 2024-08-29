// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

// Function to validate email address
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// POST endpoint to handle form submissions
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Check if email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }
    // Create and save the new contact
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message received' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
