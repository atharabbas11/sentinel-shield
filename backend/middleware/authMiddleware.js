// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Contact = require('../models/contactModel'); 

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret_token_for_project'; // jwt secret token

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            if (!token) {
                return res.status(401).json({ message: 'No token provided' }); // if no token provied then show this message
            }

            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
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


// old code

// const protect = asyncHandler(async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, JWT_SECRET);
//             req.user = await User.findById(decoded.id).select('-password');
//             next();
//         } catch (error) {
//             console.error('JWT Verification error:', error);
//             res.status(401).json({ message: 'Not authorized, token failed' });
//         }
//     } else {
//         res.status(401).json({ message: 'Not authorized, no token' });
//     }
// });
