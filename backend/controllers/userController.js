// controllers/userController.js

const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_token_for_project'; // jwt secret token

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


// Get user profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profileImage: user.profileImage ? `${req.protocol}://${req.get('host')}/${user.profileImage}` : null,
            // profileImage: user.profileImage
        });
    } else {
        res.status(404).json({ message: 'User not found' }); // Include a failure message
    }
});


// Get user ID
const getUserId = asyncHandler(async (req, res) => {
    const userId = req.user._id;  // Assuming `req.user` is set by the `protect` middleware
    res.json({ userId });
});


// Generating Token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d' // Adjust as needed eample: 1d 7d 14d...
    });
};

module.exports = { registerUser, authUser, getUserProfile, getUserId, generateToken };




