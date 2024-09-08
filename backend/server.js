// server.js

require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes'); 
const path = require('path');
const fs = require('fs');

const app = express();

// Create uploads directory if it does not exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Connect to MongoDB
connectDB();

// Security and CORS Middleware
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:3000', 'http://192.168.0.147:3000', 'https://sentinel-shield-frontend.onrender.com/'];
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// app.use(cors({
//     origin: 'http://localhost:3000', // Ensure your frontend URL
//     methods: 'GET,POST,PUT,DELETE',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
// app.use(morgan('dev'));
// Enable detailed logging only in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('combined'));
  } else {
    // Disable logging or use a minimal format in production
    app.use(morgan('tiny'));
  }

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

// Serve static files from the uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/uploads', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow from your frontend URL
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin'); // Allows cross-origin requests
    next();
  }, express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'An internal server error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
