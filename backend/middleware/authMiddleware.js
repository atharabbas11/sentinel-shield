// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Contact = require('../models/contactModel'); 

const JWT_SECRET = process.env.JWT_SECRET; // jwt secret token

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token and decode payload
            if (!token) {
                return res.status(401).json({ message: 'No token provided' }); // if no token provied then show this message
            }

            // Fetch user from the database and attach to request object
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            // Proceed to next middleware or route handler
            next();
        } catch (error) {
            console.error('JWT Verification error:', error);
            res.status(401).json({ message: 'Token is not valid or has expired' });
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});

module.exports = { protect };
