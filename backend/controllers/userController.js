// controllers/userController.js

const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // jwt secret token
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '30d'; // Configurable expiration time ( Adjust as needed eample: 1d 7d 14d...)


// Generating Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400).json({ message: 'User already exists' }); // if user already exist give this message
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'Registration successful.\n \t Redirecting to login page.' // Include a success message
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' }); // Include a failure message
    }
});


// Get user ID
const getUserId = asyncHandler(async (req, res) => {
    const userId = req.user._id;  // Assuming `req.user` is set by the `protect` middleware
    res.json({ userId });
});


// Authenticate a user
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            message: 'Login successful' // Include a success message
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' }); // Include a failure message
    }
});


const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            // Construct the profile image URL with forward slashes
            // const profileImageUrl = user.profileImage ? `${req.protocol}://${req.get('host')}/${user.profileImage.replace(/\\/g, '/')}` : null;
            const profileImageUrl = user.profileImage ? `https://${req.get('host')}/${user.profileImage.replace(/\\/g, '/')}` : null;


            // Output the raw background image path from the database
            const backgroundImagePath = user.backgroundImage || null;

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: profileImageUrl,
                backgroundImage: backgroundImagePath, // Output raw background image path
            });
        } else {
            res.status(404).json({ message: 'User not found' }); // Include a failure message
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' }); // Handle potential server errors
    }
});

const updateBackgroundImage = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is obtained from authentication middleware
    const { backgroundImageUrl } = req.body;

    if (!backgroundImageUrl) {
      return res.status(400).json({ message: 'Background image URL is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.backgroundImage = backgroundImageUrl; // Save the background image URL
    await user.save();

    res.status(200).json({ message: 'Background image updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, authUser, getUserProfile, getUserId, generateToken, updateBackgroundImage };



