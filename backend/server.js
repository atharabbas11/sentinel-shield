// server.js

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes'); // Adjust the path to your routes file

const path = require('path');
const fs = require('fs');

const app = express();


// Create uploads directory if it does not exist
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}
  

// Connect to MongoDB
connectDB();

// CORS middleware
// app.use(cors()); 

// dont use this below onces
app.use(cors({
    origin: '*', // Allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes); // Ensure this matches your route


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
